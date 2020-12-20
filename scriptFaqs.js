window.onload = function() {
    const reqs = [
        {
            url: 'faq.json',
            id: 'faq',
            cb: createFaqItem
        }
    ];
    loadData(reqs);
}
