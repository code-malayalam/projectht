window.onload = function() {
    const reqs = [
        {
            url: 'clinics.json',
            id: 'clinics',
            cb: createClinicItem
        }
    ];
    loadData(reqs);
}
