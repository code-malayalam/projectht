window.onload = function() {
        fillListItems('clinics.json', 'clinics', createClinicItem);
        fillListItems('faq.json', 'faq', createFaqItem);
}

function gotoFaq(id) {
    console.log('FAQ ID=', id);
}

function gotoClinic(id) {
    console.log('CLINIC ID=', id);
}

function fillListItems(url,id, cb) {
    fetch(url + '?v=2')
    .then(response => response.json())
    .then((data = []) => {
        const dom = data.map(cb).join(' ');
        var node = document.getElementById(id);
        node.insertAdjacentHTML('beforeend', dom);
    });
}

function createFaqItem(item) {
    const {
        id,
        mal = {},
        img,
    }  = item;

    const {
        q,
        a
    } = mal;

    return `
        <div class="faq-item section-item" onclick="gotoFaq(${id})">
            ${img ? `
                <div class="faq-img">
                    <img src="images/${img}" alt="logo" width="100px" height="100px">
                </div>
            ` : ''}
            <div>
                <div class="faq-item-header">
                    ${q}
                </div>
                <div class="faq-item-body">
                    ${a}
                </div>
            </div>
        </div>
    `;
}



function createClinicItem(item) {
    const {
        id,
        name,
        icon = 'favicon.png',
        address = []
    }  = item;

    const place = address.map((add) => add.place || '').join(', ');

    return `
        <div class="clinic-item section-item" onclick="gotoClinic(${id})">
            <div class="clinic-img">
                <img src="icons/${icon}" alt="logo" width="40px" height="40px">
            </div>
            <div class="clinic-body">
                <div class="clinic-title">
                    ${name}
                </div>
                <div class="clinic-descr">
                    ${place}
                </div>    
            </div>
        </div>
    `;
}

