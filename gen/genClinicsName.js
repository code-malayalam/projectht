
const clinics = require('../api/clinics.json');

function main() {
    const name = clinics
        .sort((a, b) => a.rank - b.rank)
        .map((item) => item.shortName || item.name);
    console.log(name.join(', '));
}

main();