import * as express from 'express';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

import * as requestImageSize from 'request-image-size';

const app = express();

app.get("/size", async (expressRequest, expressResponse, expressNext) => {
    const url = expressRequest.query.url;

    requestImageSize(url)
    .then(size => {
        const result = {
            width: size.width,
            height: size.height,
        };
        expressResponse.json(result);
    })
    .catch(err => console.error(err));
})

app.get("/getogp", async (expressRequest, expressResponse, expressNext) => {
    const url = expressRequest.query.url;

    const res = await fetch(url);

    if (res.status !== 200) {
        console.log(`error status:${res.status}`);
        expressNext(res.status);
        return;
    }

    const result = {
        exists: false,
        title: "",
        description: "",
        url: "",
        image: "",
        site_name: "",
        type: "",
    }

      // jqueryチックに使えるように変換
    const $ = cheerio.load(await res.text());
    const ogTitleQuery = $("meta[property='og:title']");

    if (ogTitleQuery.length > 0) {
        result.exists = true;
        result.title = $("meta[property='og:title']").attr("content");
        result.description = $("meta[property='og:description']").attr("content");
        result.url = $("meta[property='og:url']").attr("content");
        result.image = $("meta[property='og:image']").attr("content");
        result.site_name = $("meta[property='og:site_name']").attr("content");
        result.type = $("meta[property='og:type']").attr("content");
    } else {
        result.title = $("head title").text()
        result.description = $("meta[name='description']").attr("content");
    }

    expressResponse.json(result);

})

app.listen(6060, () => console.log('Listening on port 6060'));