import { parseFeed } from "jsr:@mikaelporttila/rss@*";

// const rss_feed = 'https://feeds.rebuild.fm/rebuildfm'
const rss_feed = 'https://api.substack.com/feed/podcast/217357.rss'

const response = await fetch(rss_feed);
const xml = await response.text();
const feed = await parseFeed(xml);
await Deno.writeTextFile('data/podcast/rebuild-rss.json', JSON.stringify(feed));