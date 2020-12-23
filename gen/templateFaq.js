
function getQuesSection(q = '', a = '', img) {
    return `
        ${
            img ? `
                <div class="faq-img">
                    <img src="/images/${img}" alt="logo">
                </div>
            ` : ''
        }
        <div>
            <div class="faq-item-header">
                ${q}
            </div>
            <div class="faq-item-body">
                ${a}
            </div>
        </div>
    `;
}

function template1(faq, relatedFaqs = []) {

    const {
        id, 
        mal = {},
        img
    } = faq;

    const {
        q,
        a
    } = mal;

    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="shortcut icon" type="image/jpg" href="/favicon.png"/>
                <link rel="preconnect" href="https://fonts.gstatic.com">
                <link href="https://fonts.googleapis.com/css2?family=Baloo+Chettan+2:wght@400;500;600;700;800&display=swap" rel="stylesheet">
                <title>HT MALAYALAM</title>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-826R4FRRS7"></script>

                <meta property="og:title" content="${q}"/>
                <meta property="og:description" content="${a}">
                <meta property="og:type" content="article"/>
                <meta property="og:site_name" content="HT Malayalam"/>
                <meta property="og:url" content="https://htmalayalam.in/faq/faq${id}.html"/>

                <script src="gtag.js"></script>

                <link rel="stylesheet" href="/styles.css?v=2">
                <link rel="stylesheet" href="/stylesFaqs.css?v=2">
                <script src="/script.js?v=2"></script>
                <script src="/scriptFaqs.js?v=2"></script>
            </head>
            <body class="page-faq" id="page-faq-${id}">
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

                <div class="warning">
                        &#9888; Hair Transplant Malayalam Telegram ഗ്രൂപ്പിൽനിന്നും മറ്റു സൈറ്റുകളിൽ നിന്നും സമാഹരിച്ച പൊതുവായ വിവരങ്ങളാണ് ഈ സൈറ്റിൽ നൽകിയിട്ടുള്ളത്. 
                        അന്തിമമായ തീരുമാനം ഒരു ഡോക്ടറുടെ നിർദ്ദേശപ്രകാരം മാത്രം കൈക്കൊള്ളുക.
                </div>
                <div class='loading' id="loading">
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>

                <div class="content">
                    <div class="faq-item section-item first-item">
                        ${getQuesSection(q, a, img)}
                    </div>
                    <div class="faq-sub">
                        ${relatedFaqs.map((item) => {
                            const {
                                id, 
                                mal = {},
                                img
                            } = item;
                        
                            const {
                                q,
                                a
                            } = mal;

                            return `
                                <div class="faq-item" onclick="gotoFaq('${id}')">
                                    ${getQuesSection(q, a, img)}
                                </div>
                            `;
                        }).join('\n')}
                    </div>
                </div>

                <div class="faq-more-title">
                    കൂടുതൽ ചോദ്യങ്ങൾ 
                </div>
                <div class="content question-list" id="content">
                    <div class="faq" id="faq">
                        <!-- Script fills here -->
                    </div>
                </div>
                
                <div class="buttons">
                    <a href="/clinics.html"> ക്ലിനിക്കുകൾ </a>
                    <a href="/faqs.html"> സംശയങ്ങൾ  </a>
                </div>
                <div class="bottom"> &#169;	htmalayalam.in. All rights reserved.</div>
            </body>
        </html>

    `;
}

module.exports = template1;