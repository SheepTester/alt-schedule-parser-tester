const EARLIEST_AM_HOUR = 6;

const HTMLnewlineRegex = /<(p|div|br).*?>|\)(?=[A-Z])/g;
const noHTMLRegex = /<.*?>/g;
const noNbspRegex = /&nbsp;/g;
const parserRegex = /(?:\n|,|\))(.*?)\(?(1?[0-9]):([0-9]{2}) *(?:-|–) *(1?[0-9]):([0-9]{2}) *(pm)?(?=\))?/g;
// const timeGetterRegex = /\(?(1?[0-9]):([0-9]{2}) *(?:-|–) *(1?[0-9]):([0-9]{2}) *(pm)?\)?/;
const getPeriodLetterRegex = /\b[a-g]\b/;

function parseAlternate(summary, description) {
  if (/(schedule|extended)/i.test(summary)) {
    if (!description) return "/srig";
    description = "\n" + description.replace(HTMLnewlineRegex, "\n").replace(noHTMLRegex, "").replace(noNbspRegex, " ");
    let periods = [];
    description.replace(parserRegex, (m, name, sH, sM, eH, eM, pm) => {
      name = name.trim();
      if (!name) return;

      sH = +sH; sM = +sM; eH = +eH; eM = +eM;
      if (sH < EARLIEST_AM_HOUR || pm) sH += 12;
      if (eH < EARLIEST_AM_HOUR || pm) eH += 12;
      let startTime = sH * 60 + sM,
      endTime = eH * 60 + eM;

      let duplicatePeriod = periods.findIndex(p => p.start === startTime);
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
  else if (~name.indexOf("lunch")) return "lunch";
  else return;
}
