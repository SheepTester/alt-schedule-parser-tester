const fs = require('fs');
const regices = require('./regices.js');

fs.readFile('./tests/descriptions.txt', 'utf8', (err, text) => {
  if (err) return console.error(err);

  text = '\n' + text
    .replace(regices.HTMLnewline, '\n')
    .replace(regices.noHTML, '')
    .replace(regices.noNbsp, ' ');

  console.log(text.replace(regices.parser, '\n[PERIOD $1: $2:$3 - $4:$5]\n'));
});
