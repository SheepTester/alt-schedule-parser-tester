module.exports = {
  HTMLnewline: /<(p|div).*?>/g,
  noHTML: /<.*?>/g,
  noNbsp: /&nbsp;/g,
  parser: /(?:\n|,|\))(.*?)\(?(1?[0-9]):([0-9]{2})-(1?[0-9]):([0-9]{2})(?=\))?/g
};
