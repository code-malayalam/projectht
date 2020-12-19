window.onload = function() {
        fillListItems('clinics.json', createClinicItem)
}

function gotoFaq(id) {
    console.log('FAQ ID=', id);
}

function gotoClinic(id) {
    console.log('CLINIC ID=', id);
}

function fillListItems(url, cb) {
    fetch(url + '?v=2')
    .then(response => response.json())
    .then((data = []) => {
        const dom = data.map(cb).join(' ');
        var node = document.getElementById("clinics");
        node.insertAdjacentHTML('beforeend', dom);
    });
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
                <img src="${icon}" alt="logo" width="40px" height="40px">
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

