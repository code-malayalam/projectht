console.log('Hello');

const template1 = require('./template1');
console.log(template1());


var fs = require('fs');

//create a file named mynewfile1.txt:
fs.writeFile('mynewfile1.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});

