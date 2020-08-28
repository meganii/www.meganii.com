
const Apaw = require('@johnfoderaro/apaw');
const fs = require('fs').promises;
const path = require("path");

const regAmazonWord = /\{\{\% amazon.+?(([A-Z]|[0-9]){10}) \%\}\}/g;
const mdDir = '/content/blog';
const dataDir = 'data/amazon';

const apaw = Apaw({
  host: 'webservices.amazon.co.jp',
  region: 'us-west-2',
  key: process.env['AWS_ACCESS_KEY_ID'],
  secret: process.env['AWS_SECRET_ACCESS_KEY'],
});

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));


(async () => {
  let ids = [];
  const filepath = '/Users/meganii/src/github.com/meganii/www.meganii.com/content/blog/2020-08-08-kaizen-in-working-from-home.md';
  const content = await fs.readFile(filepath, { encoding: 'utf8' });
  const matches = content.matchAll(regAmazonWord);
  for (const match of Array.from(matches, m => m[1])) {
    ids.push(match);
  }

  const asin_list = [...new Set(Array.from(ids, x => `${x}`))];

  try {

    for (i = 0; i < asin_list.length; i = i + 10) {
      const results = await apaw.request('GetItems', {
        ItemIds: asin_list.slice(i, i + 10),
        ItemIdType: 'ASIN',
        Marketplace: 'www.amazon.co.jp',
        PartnerTag: 'meganii-22',
        PartnerType: 'Associates',
        Resources: [
          'Images.Primary.Small',
          'Images.Primary.Medium',
          'Images.Primary.Large',
          'ItemInfo.ByLineInfo',
          'ItemInfo.Classifications',
          'ItemInfo.ContentInfo',
          'ItemInfo.Title'
        ],
      });
      const data = JSON.parse(results.data);
      // console.log(results);
      // console.log(data['ItemsResult']['Items'][0]['Images']);
      // console.log(data['ItemsResult']['Items'][0]['ItemInfo']);
      const items = data['ItemsResult']['Items'];
      console.log(items);
      for (const item of items) {
        if (item['ItemInfo']['ContentInfo'] && item['ItemInfo']['ContentInfo']['PublicationDate'] && item['ItemInfo']['ContentInfo']['PublicationDate']['DisplayValue']) {
          let displayDate = `${item['ItemInfo']['ContentInfo']['PublicationDate']['DisplayValue']}`;
          if (displayDate.length < 9) {
            displayDate = `${displayDate.substring(0, displayDate.length - 1)}-01`
          }
          item['ItemInfo']['ContentInfo']['PublicationDate']['DisplayValue'] = displayDate;
        }
        await fs.writeFile(`${dataDir}/${item['ASIN']}.json`, JSON.stringify(item, null, '    '));
      }

      await sleep(5000);
    }


  } catch (e) {
    console.error(e);
  }
})();

