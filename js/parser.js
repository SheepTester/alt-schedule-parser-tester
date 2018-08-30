const EARLIEST_AM_HOUR = 6;

const HTMLnewlineRegex = /<(p|div|br).*?>|\) *(?=[A-Z0-9])/g;
const noHTMLRegex = /<.*?>/g;
const noNbspRegex = /&nbsp;/g;
// const parserRegex = /(?:\n|,|\))(.*?)\(?(1?[0-9]):([0-9]{2}) *(?:-|–) *(1?[0-9]):([0-9]{2}) *(pm)?(?=\))?/g;
const timeGetterRegex = /\(?(1?[0-9]):([0-9]{2}) *(?:-|–) *(1?[0-9]):([0-9]{2}) *(pm)?\)?/;
const newLineRegex = /\r?\n/g;
const getPeriodLetterRegex = /\b[a-g]\b/;

function parseAlternate(summary, description) {
  if (/(schedule|extended)/i.test(summary)) {
    if (!description) return "/srig";
    description = "\n" + description.replace(HTMLnewlineRegex, "\n").replace(noHTMLRegex, "").replace(noNbspRegex, " ");
    let periods = [];
    description.split(newLineRegex).map(str => {
      let times;
      const name = str.replace(timeGetterRegex, (...matches) => {
        times = matches;
        return '';
      }).trim();

      if (!times) {
        if (periods.length > 0) {
          periods[periods.length - 1].original += "\n" + name;
        }
        return;
      }

      let [, sH, sM, eH, eM, pm] = times;

      sH = +sH; sM = +sM; eH = +eH; eM = +eM;
      if (sH < EARLIEST_AM_HOUR || pm) sH += 12;
      if (eH < EARLIEST_AM_HOUR || pm) eH += 12;
      const startTime = sH * 60 + sM,
      endTime = eH * 60 + eM;

      const duplicatePeriod = periods.findIndex(p => p.start === startTime);
      if (~duplicatePeriod) {
        periods[duplicatePeriod].original += "\n" + name;
      } else {
        // customise your format here
        periods.push({
          original: name,
          period: identifyPeriod(name),
          start: startTime,
          end: endTime
        });
      }
    });
    return periods;
  } else if (/(holiday|no\sstudents|break)/i.test(summary)) {
    return null;
  }
}

function identifyPeriod(name) {
  name = name.toLowerCase();
  if (~name.indexOf("period")) {
    let letter = getPeriodLetterRegex.exec(name);
    if (letter) return letter[0];
  }
  if (~name.indexOf("flex")
      || ~name.indexOf("self")
      || ~name.indexOf("assembly")
      || ~name.indexOf("tutorial"))
    return "flex";
  else if (~name.indexOf("collaboration")) return "collaboration";
  else if (~name.indexOf("meeting")) return "meetings";
  else if (~name.indexOf("brunch") || ~name.indexOf("break")) return "brunch";
  else if (~name.indexOf("lunch") || ~name.indexOf("turkey")) return "lunch";
  else return;
}
