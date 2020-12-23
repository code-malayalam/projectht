console.log('Hello');

const templateClinic = require('./templateClinic');
let clinics = require('../api/clinics.json');
let docData = require('../api/doctors.json');

console.log(docData);

var fs = require('fs');
const fsExtra = require('fs-extra');
const dirName = '../clinic/'
fsExtra.emptyDirSync(dirName);

clinics.forEach((item) => {
  const content = templateClinic(item, docData);
  fs.writeFile(dirName + item.id + '.html', content, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

});
