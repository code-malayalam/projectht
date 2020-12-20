window.onload = function() {
    const reqs = [
        {
            url: 'clinics.json',
            id: 'clinics',
            cb: createClinicItem
        }, {
            url: 'faq.json',
            id: 'faq',
            cb: createFaqItem
        }
    ];
    loadData(reqs);
}
