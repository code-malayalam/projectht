window.onload = function() {
    const reqs = [
        {
            url: '/api/clinics.json',
            id: 'clinics',
            cb: createClinicItem
        }, {
            url: '/api/faq.json',
            id: 'faq',
            cb: createFaqItem
        }
    ];
    loadData(reqs);
}
