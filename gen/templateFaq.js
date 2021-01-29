
const {
    FAQ_BASE_URL,
    IMAGE_BASE_URL,
    AUDIO_BASE_URL
} = require('./constants');

function getQuesSection(q = '', a = '', img, audio = [], ref = []) {

    const ques = q.replace(/\n/g, '<br>');
    const ans = a.replace(/\n/g, '<br>');

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
                ${ques}
            </div>
            <div class="faq-item-body">
                ${ans}
            </div>
            <div class="audio-section">
                ${
                    audio.map((item) => {
                        return `
                        <audio controls>
                            <source src="/audio/${item}" type="audio/ogg; codecs=opus"/>
                            Your browser does not support the audio element.
                        </audio>
                        `;
                    }).join('<br>')
                }
            </div>
            <div class="ref-section">
                ${
                    ref.map((item, index) => {
                        return `
                        <div>
                            [${index + 1}] <a target="_blank" href="${item}">${item}</a>

                        </div>
                        `;
                    }).join('<br>')
                }
            </div>
        </div>
    `;
}

function template1(faq, relatedFaqs = []) {

    const {
        id, 
        mal = {},
        img,
        audio = [],
        ref
    } = faq;

    const {
        q,
        a
    } = mal;

    const contentUrl = `${FAQ_BASE_URL}/faq${id}.html`;
    const encodedUrl = encodeURIComponent(contentUrl);
    const ques = q.replace(/\n/g, ' ');
    const ans = a.replace(/\n/g, ' ');

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

                <meta property="og:title" content="${ques}"/>
                <meta property="og:description" content="${ans}">
                <meta property="og:type" content="article"/>
                <meta property="og:site_name" content="HT Malayalam"/>
                <meta property="og:url" content="${contentUrl}"/>
                ${img ? `<meta property="og:image" content="${IMAGE_BASE_URL}/${img}"/>` : ''}
                ${audio && audio.length ? `<meta property="og:audio" content="${AUDIO_BASE_URL}/${audio[0]}"/>` : ''}
                ${audio && audio.length ? `<meta property="og:image" content="${IMAGE_BASE_URL}/audio.png"/>` : ''}     
                

                <script src="/gtag.js"></script>

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
                        ${getQuesSection(q, a, img, audio, ref)}
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

                <div class="buttons share">
                    <a href="https://telegram.me/share/url?url=${encodedUrl}">
                        <i class="fa fa-telegram fa-lg" aria-hidden="true"></i>
                        Share to Telegram
                    </a>
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
