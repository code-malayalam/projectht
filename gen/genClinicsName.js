
const clinics = require('../api/clinics.json');

function main() {
    const name = clinics.map((item) => item.shortName || item.name);
    console.log(name.join(', '));
}

main();