
const templateClinic = require('./templateClinic');
const templateFaq = require('./templateFaq');

const clinics = require('../api/clinics.json');
const docData = require('../api/doctors.json');
const faqData = require('../api/faq.json');

const fs = require('fs');
const fsExtra = require('fs-extra');

function getSubFaqs(ids = [], allData = []) {
    return allData.filter((item) => ids.indexOf(item.id) !== -1);
}

function checkDuplicate(arr, label) {
    const store = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if(store.indexOf(item.id) > 0) {
            throw 'Duplicate id ' + item.id + ' for ' + label;
        }  
        store.push(item.id);
    }
    return true;
}

function generateClinicFiles() {
    const dirName = '../clinic/'
    fsExtra.emptyDirSync(dirName);

    clinics.forEach((item) => {
        const content = templateClinic(item, docData);
        fs.writeFile(dirName + item.id + '.html', content, function (err) {
            if (err) throw err;
            console.log('Saved Clinic ', item.id);
        });
    });
}

function generateFaqFiles() {
    const dirName = '../faq/'
    fsExtra.emptyDirSync(dirName);

    faqData.forEach((item) => {
        const subFaqs = getSubFaqs(item.sub, faqData);
        const content = templateFaq(item, subFaqs);
        fs.writeFile(dirName + item.id + '.html', content, function (err) {
            if (err) throw err;
            console.log('Saved! Faq', item.id);
        });
    });
}

checkDuplicate(clinics, 'Clinics');
checkDuplicate(faqData, 'Faq');
checkDuplicate(docData, 'Doctors')
generateFaqFiles();
generateClinicFiles();
