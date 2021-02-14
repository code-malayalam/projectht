const { SitemapStream, streamToPromise } = require( 'sitemap' )
const { Readable } = require( 'stream' )
const fs = require('fs');
const clinics = require('../api/clinics.json');
const faqs = require('../api/faq.json');


const basePaths = [
    '',
    'faqs',
    'clinics',
];

const faqPaths = faqs.map((item) => `faq/${item.id}`);
const clinicsPaths = clinics.map((item) => `clinic/${item.id}`);

  // An array with your links
  const links = [...basePaths, ...faqPaths, ...clinicsPaths]
    .map((url) => ({
        url,
        changefreq: 'weekly'
    }));

  // Create a stream to write to
  const stream = new SitemapStream( { hostname: 'https://htmalayalam.in' } )

  // Return a promise that resolves with your XML string
  return streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString()
  ).then((data) => {
      console.log(data);
      fs.writeFile(
          '../sitemap.xml', data, function (err) {
        if (err) throw err;
        console.log('Saved! Sitemap');
    });
  })