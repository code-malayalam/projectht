const CLINIC_DISPLAY_LENGTH = 5;

let homeClikedStateDefault = true;

const points = {
    hairfreehairgrow: 3,
    hairgraaft: 10,
    turkey_kerala: 16,
    madari: 8,
    la_denisitae: 35,
    cht: 4,
    hairocraft: 5,
    hairtree: 11
};
function sortClinics (data) {
    console.log(data);
    return data.sort((a, b) => {
        const aPoint = points[a.id] || 0;
        const bPoint = points[b.id] || 0;
        return bPoint - aPoint;
    });
}

function loadData(reqs) {
    const unfilteredData = [];

    const all = reqs.map((req) => {
        return fetch(req.url + '?v=2')
            .then((response) => {
                
                return response.json();
            })
            .then((data) => {
                unfilteredData.push(data);
                let ret = data;
                if(req.filter) {
                    ret = req.filter(data);
                }
                if(req.sort) {
                    ret = req.sort(ret);
                }
                return ret;
            })
            .catch((err) => {
                console.log(err);
                return [];
            });
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
            return data;
        })
    return Promise.all(all)
        .then(() => {
            return unfilteredData;
        });
}

function gotoFaq(id) {
    window.location = `/faq/${id}`;
}

function gotoClinic(id) {
    window.location = `/clinic/${id}`;
}

function gotoAllClinics() {
    window.location = '/clinics';
}

function gotoAllFaqs() {
    window.location = '/faqs';
}

function goHome() {
    window.location = '/index';
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
        q = '',
        a = ''
    } = mal;


    const ques = q.replace(/\n/g, '<br>');
    const ans = a.replace(/\n/g, '<br>');

    return `
        <div class="faq-item section-item" onclick="gotoFaq('${id}')">
            ${img ? `
                <div class="faq-img">
                    <img src="/images/${img}" alt="logo">
                </div>
            ` : ''}
            <div>
                <div class="faq-item-header">
                    ${ques}
                </div>
                <div class="faq-item-body">
                    ${ans}
                </div>
            </div>
        </div>
    `;
}

function createClinicItem(item, index) {
    const {
        id,
        name,
        rate,
        logo = 'favicon.png',
        places = []
    }  = item;

    const place = places.join(', ');
    const className = index >= CLINIC_DISPLAY_LENGTH ? 'hide-at-homepage': '';
    const rateText = rate ? rate : '';

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
                    ${rateText}
                </div>
                <div class="clinic-descr">
                    ${place}
                </div>    
            </div>
        </div>
    `;
}

