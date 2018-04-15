function parseAlternate(summary, description) {
  const EARLIEST_AM_HOUR = 6;
  if (/(schedule|extended)/i.test(summary)) {
    if (!description) return "/srig";
    let periodItems = description.replace(/<p>(.*?)<\/p>/g,"$1\n").replace(/<\/?[^>]+>/gi, "").replace(/&nbsp;/g, " ").replace(/(\).*?),(.*?\()/g, "$1\n$2").replace(/\)/g, ")\n").split(/\r?\n/),
    periods = [];
    for (let i = 0; i < periodItems.length; i++) {
      let period = periodItems[i],
      matches = /(.*?)\(?(1?[0-9]):([0-9]{2})-(1?[0-9]):([0-9]{2})\)?/g.exec(period);
      if (!period.trim()) continue;
      if (matches) {
        let times = matches.slice(2, 6).map(Number);
        if (times[0] < EARLIEST_AM_HOUR) times[0] += 12;
        let startTime = times[0] * 60 + times[1],
            periodName = matches[1].trim().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;"),
            foundDuplicate = false,
            j;
        for (j = 0; j < periods.length; j++) {
          if (periods[j].start === startTime) {
            foundDuplicate = true;
            break;
          }
        }
        if (foundDuplicate) {
          periods[j].name += "\n" + periodName;
        } else {
          if (times[2] < EARLIEST_AM_HOUR) times[2] += 12;
          periodName = periodName.toLowerCase()
          if (periodName.slice(0, 6) === "period") periodName = periodName[7];
          else if (periodName === "flextime") periodName = "flex";
          else if (~periodName.indexOf("collaboration")) periodName = "collaboration";
          else if (~periodName.indexOf("meeting")) periodName = "meetings";
          else if (~periodName.indexOf("break")) periodName = "brunch";
          else if (~periodName.indexOf("lunch")) periodName = "lunch";
          periods.push({
            period: periodName,
            start: startTime,
            end: times[2] * 60 + times[3]
          });
        }
      } else if (periods.length > 0) {
        periods[periods.length - 1].name += periodItems[i].trim().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
      }
    }
    return periods;
  } else if (/(holiday|no\sstudents|break)/i.test(summary)) {
    return null;
  }
}
