import * as express from 'express';
import * as ogs from 'open-graph-scraper';
import * as requestImageSize from 'request-image-size';

const app = express();

app.get("/size", async (expressRequest, expressResponse, expressNext) => {
	requestImageSize(expressRequest.query.url)
		.then(size => {
			const result = {
				width: size.width,
				height: size.height,
			};
			expressResponse.json(result);
		})
		.catch(err => console.error(err));
})

app.get("/ogp", async (expressRequest, expressResponse, expressNext) => {
	const data = await ogs({ url: expressRequest.query.url })
		.catch((err) => {
			// expressNext(err);
			console.error(err);
			return;
		});
	if (data) {
		expressResponse.json(data.result);
	}
});

app.listen(6060, () => console.log('Listening on port 6060'));