import express from 'express'
import ogs from 'open-graph-scraper';

const app: express.Express = express();

app.get("/ogp", async (expressRequest, expressResponse, expressNext) => {
	const data = await ogs({ url: expressRequest.query.url as string})
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