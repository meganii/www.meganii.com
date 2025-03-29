
import { parseArgs } from "jsr:@std/cli@1.0.15/parse-args";

const rakutenAppId = Deno.env.get('RAKUTEN_APP_ID');
const rakutenEndPoint = `https://app.rakuten.co.jp/services/api/Product/Search/20170426?format=json&applicationId=${rakutenAppId}`;

const flags = parseArgs(Deno.args, {
  string: ["isbn"]
});
const isbn = flags.isbn || '';

const res = await fetch(`${rakutenEndPoint}&keyword=${isbn}`)
const jsonData = await res.json();

const products = jsonData['Products'];

let data = {};
products.forEach((product) => {
    const productData = product['Product'];
    data = {
      'isbn': isbn,
      'productName': productData['productName'],
      'productUrlPC': productData['productUrlPC'],
      'productUrlMobile': productData['productUrlMobile'],
      'mediumImageUrl': productData['mediumImageUrl'],
    }
  }
);
console.log(data);

// const image = jsonData['Products'][0]['Product']['mediumImageUrl'];
// console.log(image);

// if (jsonData['Products'] && jsonData['Products'][0] && jsonData['Products'][0]['Product']) {
//     const product = jsonData['Products'][0]['Product'];
//     const data = {
//       'productUrlPC': product['productUrlPC'],	
//       'productUrlMobile': product['productUrlMobile']
//     }
//     console.log(data);
// }