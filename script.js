const CLINIC_DISPLAY_LENGTH = 5;

let homeClikedStateDefault = true;

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
    return fetch(url + '?v=2')
        .then(response => response.json())
        .then((data = []) => {
            const dom = data.map(cb).join(' ');
            var node = document.getElementById(id);
            node.insertAdjacentHTML('beforeend', dom);
        });
}

function clickShowMoreLess() {
    homeClikedStateDefault = !homeClikedStateDefault;
    const content = document.getElementById('content');
    if (homeClikedStateDefault) {
        content.classList.add('click-state-default');
        content.classList.remove('click-state-clicked');
    } else {
        content.classList.add('click-state-clicked');
        content.classList.remove('click-state-default');
    }
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
                    <img src="images/${img}" alt="logo">
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

function createClinicItem(item, index) {
    const {
        id,
        name,
        icon = 'favicon.png',
        address = []
    }  = item;

    const place = address.map((add) => add.place || '').join(', ');
    const className = index >= CLINIC_DISPLAY_LENGTH ? 'hide-at-homepage': '';

    return `
        <div class="clinic-item section-item ${className}" onclick="gotoClinic(${id})">
            <div class="clinic-img">
                <img src="icons/${icon}" alt="logo">
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

