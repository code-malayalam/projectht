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
    loadData(reqs);
}
