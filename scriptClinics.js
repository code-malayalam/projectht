
function onPlaceSelect(param) {
    const place = param.value;
    if(!place || place === 'All Places') {
        window.location = "/clinics";
    } else {
        window.location = "/clinics?place=" + place.toLocaleLowerCase();
    }
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const place = urlParams.get('place');
    const reqs = [
        {
            url: '/api/clinics.json',
            id: 'clinics',
            cb: createClinicItem,
            sort: sortClinics,
            filter: (data) => {
                if(!place) {
                    return data;
                }
                return data.filter(({places = []}) => {
                    return places.find((pItem) => pItem.toLocaleLowerCase() === place.toLocaleLowerCase());
                });
            }
        }
    ];
    loadData(reqs)
    .then(([data]) => {
        const places = new Set();
        data.forEach(item => {
            item.places.map(places.add, places);
        });
        const placesArr = Array.from(places);
        placesArr.unshift('All Places');
        const placesSelect = document.getElementById("places_select");
        placesArr.forEach((item) => {
            const option = document.createElement("option");
            option.text = item;
            option.selected = place && item.toLocaleLowerCase() === place.toLocaleLowerCase()
            placesSelect.add(option);
        });

    });
}
