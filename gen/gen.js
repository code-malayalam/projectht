console.log('Hello');

const templateClinic = require('./templateClinic');
let clinics = require('../api/clinics.json');
let docData = require('../api/doctors.json');

console.log(docData);

// console.log(template1());


var fs = require('fs');

// //create a file named mynewfile1.txt:
// fs.writeFile('mynewfile1.txt', 'Hello content!', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });


clinics.forEach((item) => {
  const content = templateClinic(item, docData);
  fs.writeFile('../clinic/' + item.id + '.html', content, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

});
