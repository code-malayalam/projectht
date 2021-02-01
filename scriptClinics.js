window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const place = urlParams.get('place');
    console.log(place);

    const reqs = [
        {
            url: '/api/clinics.json',
            id: 'clinics',
            cb: createClinicItem,
            
        }
    ];
    loadData(reqs, (data) => {
        if(!place) {
            return data;
        }
        return data.filter(({places = []}) => {
            console.log(places);
            return places.find((pItem) => pItem.toLocaleLowerCase() === place.toLocaleLowerCase());
        });
    });
}
