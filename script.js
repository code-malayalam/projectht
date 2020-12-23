const CLINIC_DISPLAY_LENGTH = 5;

let homeClikedStateDefault = true;

function loadData(reqs) {
    const all = reqs.map((req) => {
        return fetch(req.url + '?v=2')
            .then(response => response.json());
    });

    Promise.all(all)
        .then((data) => {
            const content = document.getElementById('loading');
            content.classList.add('hide-loading');
            data.forEach((resItem, index) => {
                const dom = resItem.map(reqs[index].cb).join(' ');
                var node = document.getElementById(reqs[index].id);
                node.insertAdjacentHTML('beforeend', dom);
            });
        })
}

function gotoFaq(id) {
    window.location = `/faq/${id}.html`;
}

function gotoClinic(id) {
    window.location = `/clinic/${id}.html`;
}

function gotoAllClinics() {
    window.location = '/clinics.html';
}

function gotoAllFaqs() {
    window.location = '/faqs.html';
}

function goHome() {
    window.location = '/index.html';
}

function goBack() {
    if(document.referrer.indexOf(window.location.hostname) === -1) {
        goHome();
    } else {
        window.history.back();
    }
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
        <div class="faq-item section-item" onclick="gotoFaq('${id}')">
            ${img ? `
                <div class="faq-img">
                    <img src="/images/${img}" alt="logo">
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
        logo = 'favicon.png',
        places = []
    }  = item;

    const place = places.join(', ');
    const className = index >= CLINIC_DISPLAY_LENGTH ? 'hide-at-homepage': '';

    return `
        <div class="clinic-item section-item ${className}" onclick="gotoClinic('${id}')">
            <div class="clinic-img">
                <img src="/icons/${logo}" alt="logo">
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

