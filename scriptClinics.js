window.onload = function() {
    const reqs = [
        {
            url: '/api/clinics.json',
            id: 'clinics',
            cb: createClinicItem
        }
    ];
    loadData(reqs);
}
