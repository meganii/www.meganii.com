
const Apaw = require('@johnfoderaro/apaw');
const fs = require('fs').promises;
const fetch = require('node-fetch');
const path = require("path");

const regAmazonWord = /\{\{\% amazon.+?(([A-Z]|[0-9]){10}) \%\}\}/g;
const filename = process.argv[2];
const mdDir = 'content/blog';
const dataDir = 'data/amazon';

const apaw = Apaw({
  host: 'webservices.amazon.co.jp',
  region: 'us-west-2',
  key: process.env['AWS_ACCESS_KEY_ID'],
  secret: process.env['AWS_SECRET_ACCESS_KEY'],
});

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

const rakutenEndPoint = `https://app.rakuten.co.jp/services/api/Product/Search/20170426?format=json&applicationId=${process.env['RAKUTEN_APP_ID']}`;
const getRakutenAffiliateLink = async (eanList) => {
  let data = {};
  for (janCode of eanList) {
    const res = await fetch(`${rakutenEndPoint}&keyword=${janCode}`);
    const jsonData = await res.json();
    if (jsonData['Products'] && jsonData['Products'][0] && jsonData['Products'][0]['Product']) {
      const product = jsonData['Products'][0]['Product'];
      data = {
        'productUrlPC': product['productUrlPC'],	
        'productUrlMobile': product['productUrlMobile']
      }
      break;
    }
  }
  return data;
};

const getKindleAffiliateLink = async (eanList) => {
  let data = {};
  for (janCode of eanList) {
    console.log(janCode);
    const results = await apaw.request('SearchItems', {
      Keywords: janCode,
      SearchIndex: 'KindleStore',
      Marketplace: 'www.amazon.co.jp',
      PartnerTag: 'meganii-22',
      PartnerType: 'Associates',
      ItemCount: 1,
      Resources: [
        'ItemInfo.ByLineInfo',
        'ItemInfo.Classifications',
        'ItemInfo.ContentInfo',
        'ItemInfo.Title',
        'ItemInfo.ExternalIds'
      ],
    });
    const result = JSON.parse(results.data);
    if (result.SearchResult && result.SearchResult.Items) {
      // console.log(result.SearchResult.Items[0].DetailPageURL);
      data = {
        productUrl: result.SearchResult.Items[0].DetailPageURL
      }
      break;
    }
  }
  return data;
};

const affiliateId = 'https%3A%2F%2Fck.jp.ap.valuecommerce.com%2Fservlet%2Freferral%3Fsid%3D3067752%26pid%3D886865716%26vc_url%3D';
const yahooEndpoint = `https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid=${process.env['YAHOO_APP_ID']}`;
const getYahooAffiliateLink = async (eanList) => {
  let data = {};
  for (janCode of eanList) {
    const url = `${yahooEndpoint}&affiliate_type=vc&affiliate_id=${affiliateId}&jan_code=${janCode}`;
    console.log(url);
    const res = await fetch(url);
    const jsonData = await res.json();
    if (jsonData['totalResultsAvailable']  === 0){
      continue;
    }
    const productUrl = `https://shopping.yahoo.co.jp/search?p=${janCode}`;
    data = {
      "productUrl": `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3067752&pid=886865716&vc_url=${encodeURIComponent(productUrl)}`
    }
    break;
  }
  return data;
};

(async () => {
  let ids = [];

  let files = [];
  if (filename != null && filename != "") {
    files.push(filename);
    console.log(filename)
  } else {
    files = await fs.readdir(mdDir);
    files = files.filter((file) => {
      return path.extname(file).toLowerCase() === ".md"
    });
  }

  for (const file of files) {
    console.log(path.join(mdDir, file));
    const content = await fs.readFile(path.join(mdDir, file), { encoding: 'utf8' });
    const matches = content.matchAll(regAmazonWord);
    for (const match of Array.from(matches, m => m[1])) {
      ids.push(match);
    }
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
          'ItemInfo.Title',
          'ItemInfo.ExternalIds'
        ],
      });
      const data = JSON.parse(results.data);
      // console.log(results);
      // console.log(data['ItemsResult']['Items'][0]['Images']);
      // console.log(data['ItemsResult']['Items'][0]['ItemInfo']);
      const items = data['ItemsResult']['Items'];
      console.log(items);
      // console.log(items[0]['ItemInfo']['ExternalIds']);
      for (const item of items) {
        if (item['ItemInfo']['ContentInfo'] && item['ItemInfo']['ContentInfo']['PublicationDate'] && item['ItemInfo']['ContentInfo']['PublicationDate']['DisplayValue']) {
          let displayDate = `${item['ItemInfo']['ContentInfo']['PublicationDate']['DisplayValue']}`;
          if (displayDate.length < 9) {
            displayDate = `${displayDate.substring(0, displayDate.length - 1)}-01`
          }
          item['ItemInfo']['ContentInfo']['PublicationDate']['DisplayValue'] = displayDate;
        }

        if (item['ItemInfo']['ExternalIds'] && item['ItemInfo']['ExternalIds']['EANs']) {
          const eanList = item['ItemInfo']['ExternalIds']['EANs']['DisplayValues'];
          const rakutenAffiliateLink = await getRakutenAffiliateLink(eanList);
          if (Object.keys(rakutenAffiliateLink).length != 0) {
            item['Rakuten'] = rakutenAffiliateLink;
          }
          const yahooAffiliateLink = await getYahooAffiliateLink(eanList);
          if (Object.keys(yahooAffiliateLink).length != 0) {
            item['Yahoo'] = yahooAffiliateLink;
          }
          const kindleLink = await getKindleAffiliateLink(eanList);
          if (Object.keys(kindleLink).length != 0) {
            item['Kindle'] = kindleLink;
          }
        }
        await fs.writeFile(`${dataDir}/${item['ASIN']}.json`, JSON.stringify(item, null, '    '));
      }

      await sleep(5000);
    }


  } catch (e) {
    console.error(e);
  }
})();

