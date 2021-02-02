
const {
    CLINIC_BASE_URL,
    ICON_BASE_URL
} = require('./constants');

function getStatusDom(status) {

    switch (status) {
        case 'yellowTick':
            return `
                <div class="labels">
                    <label class="label1 border-label"> ഗ്രൂപ്പിൽ ഈ ക്ലിനിക്കിൽ നിന്നും ട്രാൻസ്‌പ്ലാന്റ് ചെയ്ത ഫോട്ടോ വന്നിട്ടുണ്ട്.</label>
                </div> 
            `;
        case 'greenTick':
            return `
            <div class="labels">
                <label class="label1 border-label"> ഗ്രൂപ്പിൽ ഈ ക്ലിനിക്കിൽ നിന്നും ട്രാൻസ്‌പ്ലാന്റ് ചെയ്ത ഫോട്ടോ വന്നിട്ടുണ്ട്.</label>
                <label class="label2 border-label"> ഗ്രൂപ്പിൽ ഈ ക്ലിനിക്കിൽ നിന്നും റിസൾട് ഫോട്ടോ വന്നിട്ടുണ്ട്.</label>
            </div> 
        `;
        case 'twoTick':
            return `
            <div class="labels">
                <label class="label1 border-label"> ഗ്രൂപ്പിൽ ഈ ക്ലിനിക്കിൽ നിന്നും ട്രാൻസ്‌പ്ലാന്റ് ചെയ്ത ഫോട്ടോ വന്നിട്ടുണ്ട്.</label>
                <label class="label2 border-label"> ഗ്രൂപ്പിൽ ഈ ക്ലിനിക്കിൽ നിന്നും റിസൾട് ഫോട്ടോ വന്നിട്ടുണ്ട്.</label>
                <label class="label3 border-label"> ഗ്രൂപ്പിൽ ക്ലിനിക്കിന്റെ ബാനർ വച്ച് ട്രാൻസ്‌പ്ലാന്റ് ചെയ്ത ഫോട്ടോ വന്നിട്ടുണ്ട്.</label>
            </div> 
        `;
    
        default:
            return '';
    }

}

function getDocInfo(id, docData  = []) {
    return docData.find((item) => id === item.id) || {};
}

function getInfoText(info) {
    debugger;
    const {
        label = '',
        link,
        more = ''
    } = info;

    const moreLabel = more ? `(${more})` : '';

    if(link === true) {
        return `<a target="_blank" href="${label}">${label} ${moreLabel}</a>`
    }

    if(link === 'mailto') {
        return `<a target="_blank" href="mailto:${label}">${label} ${moreLabel}</a>`
    }

    if(link === 'tel') {
        return `<a target="_blank" href="tel:${label}">${label} ${moreLabel}</a>`
    }

    if(typeof link === "string") {
        return `<a target="_blank" href="${link}">${label} ${moreLabel}</a>`
    }

    return label + ' ' + moreLabel;

}

function getPlaceTitle(places = []) {
    const count = 10;
    const retPlaces = places.slice(0, count).join(', ')
    if(places.length <= count) {
        return retPlaces;
    }
    return `${retPlaces} and more`;
}

function getPhoneTitle(info = []) {
    const ret = []
    info.forEach((arr = []) => arr.forEach((item) => {
        if(item.link === 'tel'){
            ret.push(item.label);
        }
    }));
    return `Phone: ${ret.join(', ')}`;
}

function template1(clinic, docData = []) {

    const {
        name,
        id,
        status,
        places = [],
        info = [],
        social = [],
        banner,
        logo,
        bannerColor = 'white',
        doctors = [],
        doctorsLink,
        rate
    } = clinic;


    const titlePlaces = getPlaceTitle(places);
    const titlePhones = getPhoneTitle(info);

    const contentUrl = `${CLINIC_BASE_URL}/${id}.html`;
    const encodedUrl = encodeURIComponent(contentUrl);


    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="shortcut icon" type="image/jpg" href="/favicon.png"/>
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Baloo+Chettan+2:wght@400;500;600;700;800&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="/font-awesome/css/font-awesome.min.css">
            <title>HT MALAYALAM</title>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-826R4FRRS7"></script>
            <script src="/gtag.js"></script>

            <meta property="og:title" content="${name} - ${titlePlaces}"/>
            <meta property="og:description" content="${titlePhones}">
            <meta property="og:type" content="article"/>
            <meta property="og:site_name" content="HT Malayalam"/>
            <meta property="og:url" content="${contentUrl}">
            <meta name="twitter:card" content="summary_large_image" />
            
            ${logo ? `<meta name="twitter:image" content="${ICON_BASE_URL}/${logo}"/>` : ''}

            <link rel="stylesheet" href="/styles.css?v=2">
            <link rel="stylesheet" href="/stylesClinicGen.css?v=2">
            <script src="/script.js?v=2"></script>
        </head>
        <body id="${id}">
            <div class="top">
                <div class="header">
                    <div class="title"> 
                        <div class="logo pointer" onclick="goBack()">
                            <img src="/back.png" alt="logo" width="40px" height="40px">
                        </div>
                        <div class="title-text pointer" onclick="goHome()">
                            HT MALAYALAM
                        </div>
                    </div>
                    <div class="subtitle pointer" onclick="goHome()">
                        HAIR TRANSPLANT PORTAL
                    </div>
                </div>
                <div class="caption">
                    <span>സം</span>ശയങ്ങളും <span>ഉ</span>ത്തരങ്ങളും <span>ക്ലി</span>നിക്കുകളും
                </div>
            </div>
            <div class="clinic-content">
                <div class="banner" style="background: ${bannerColor};">
                    <img src="/icons/${banner}" alt="logo">
                </div>
                <div class="clinic-content-body">
                    <div class="clinic-content-title">
                        ${name}
                    </div>
                    ${
                        rate ? `<div class="clinic-content-row"><i class="fa fa-inr fa-lg" aria-hidden="true"></i>  ${rate}</div>` : ''
                    }
                    ${getStatusDom(status)}

                    ${
                        social && social.length ? `
                        <div class="clinic-content-row social-icons-container">
                        ${
                            social.map((sItem) => {
                                return `
                                <span class="social-icons">
                                    <a target="_blank" href="${sItem.link}"><i class="fa ${sItem.icon} fa-lg" aria-hidden="true"></i></a>
                                </span>`
                            }).join('\n')
                        }
                        </div>`
                            
                        : ''
                    }
                    ${
                        info.map((item) => {
                            return (
                                `
                                <div class="clinic-content-row">
                                    ${
                                        item.map((info) => {
                                            return `
                                                <div class="${info.highlight ? 'highlight' : ''}">
                                                    ${
                                                        info.icon ? `
                                                        <span>
                                                            <i class="fa ${info.icon} fa-lg" aria-hidden="true"></i>
                                                        </span>
                                                        ` : ''
                                                    }
                                                    
                                                    <span> ${getInfoText(info)} </span>
                                                </div>
                                            `;
                                        }
                                    ).join('\n')}

                                </div>
                                `
                            );
                        }).join('\n')
                    }
                    
                    <div class="clinic-content-title">
                        ഡോക്ടർമാർ
                    </div>
                    <div class="clinic-doctors clinic-content-row">

                        ${doctors.map((doc) => {
                            const docInfo = getDocInfo(doc.id, docData);
                            const infoText = getInfoText(docInfo);
                            const headText = doc.isHead ? '(സെന്റർ ഇൻചാർജ്)' : '';
                            return `
                                <div>
                                    <span>
                                        <i class="fa fa-user-md fa-lg" aria-hidden="true"></i>
                                    </span>
                                    <span> ${infoText} ${headText}</span>
                                </div>
                            `;
                        }).join('\n')}

                        ${doctors.length === 0 ? `
                            <div class="clinic-no-doctors border-label">
                                ഓരോ ക്ലിനിക്കിലെയും ഡോക്ടർമാരുടെ വിവരങ്ങൾ വെബ്സൈറ്റിലെ ലഭ്യമല്ല.
                            </div>
                        ` : ''}
    
                        ${
                            doctorsLink ? `
                            <div class="clinic-doctors-more">
                                ഡോക്ടമാരെ കുറിച്ച് കൂടുതൽ വിവരങ്ങൾക്ക് അവരുടെ <a target="_blank" href="${doctorsLink}"> വെബ്സൈറ്റ് </a> സന്ദർശിക്കുക.
                            </div>    
                            ` : ''
                        }
                        
                    </div>
                </div>
                <div class="group-info">
                    <div>
                        * ക്ലിനിക്കിനെ കുറിച്ച് കൂടുതൽ വിവരങ്ങൾ ഉൾപ്പെടുത്താൻ ഞങ്ങൾക്ക് മെയിൽ അയക്കുക.<a href="mailto:htmalayalam@gmail.com"> htmalayalam@gmail.com </a>
                    </div>
                    <div>
                        * ഗ്രൂപ്പ് എന്നത് Hair Transplant Malayalam Telegram group ആണ്.
                        <span>
                            <a href="https://telegram.me/joinchat/NbspPkTXXnHMWpMAMbC_bQ"> ഗ്രൂപ്പിൽ ചേരാനുള്ള ലിങ്ക് </a>
                        </span>
                    </div>
    
                </div>
                <div class="buttons share">
                    <a href="https://telegram.me/share/url?url=${encodedUrl}">
                        <i class="fa fa-telegram fa-lg" aria-hidden="true"></i>
                        Share to Telegram
                    </a>
                </div>
            </div>
            <div class="buttons">
                <a href="/clinics.html"> മറ്റു ക്ലിനിക്കുകൾ </a>
                <a href="/faqs.html"> സംശയങ്ങൾ  </a>
            </div>
            <div class="bottom"> &#169;	htmalayalam.in. All rights reserved.</div>
        </body>
    </html>    
    `;
}

module.exports=template1;
