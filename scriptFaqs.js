window.onload = function() {
    const reqs = [
        {
            url: '/api/faq.json',
            id: 'faq',
            cb: createFaqItem
        }
    ];
    loadData(reqs);
}
