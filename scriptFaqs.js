window.onload = function() {
    const reqs = [
        {
            url: '/api/faq.json',
            id: 'faq',
            cb: createFaqItem
        }
    ];
    loadData(reqs, function (rec = []) {
        const id = document.body.id || '';
        const regex = id.match(/page-faq-(.*)/);
        if(regex && regex.length >= 2) {
            const faqId = parseInt(regex[1]) || 0;
            const faq = rec.find((item) => item.id === faqId);
            if(faq) {
                const sub = faq.sub || [];
                const fullId = [faqId, ... sub];
                return rec.filter((item) => fullId.indexOf(item.id) === -1)
            }
        }
        return rec;
    });
}
