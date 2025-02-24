// --allow-net  --allow-write 
// ブックカタリストのID
// const id = 1546825398

const id = '603013428'
// const url = `https://itunes.apple.com/lookup?id=${id}&country=JP&media=podcast&entity=podcastEpisode&offset=10`
const url = `https://itunes.apple.com/search?term=603013428&country=JP&media=podcast&limit=200`
const response = await fetch(url)
const jsonData = await response.json()

console.log(jsonData)

// jsonDataのresults.trackCountがLimitである200を越えていたら、offsetを指定して再取得。jsonDataのresults.trackCountを越えるまで繰り返す
// その後、jsonDataのresultsを結合して、jsonDataのresultsに代入する
// この処理を繰り返す
// if (jsonData.resultCount > 200) {
//   let offset = 200
//   while (jsonData.resultCount > offset) {
//     const url = `https://itunes.apple.com/lookup?id=${id}&country=JP&media=podcast&entity=podcastEpisode&limit=200&offset=${offset}`
//     const response = await fetch(url)
//     const json = await response.json()
//     jsonData.results = jsonData.results.concat(json.results)
//     offset += 200
//   }
// }

// await Deno.writeTextFile('data/podcast/itunes.json', JSON.stringify(jsonData));

// https://itunes.apple.com/lookup?id=603013428&country=JP&media=podcast&entity=podcastEpisode&limit=50&offset=50&sort=recent
// https://itunes.apple.com/search?term=603013428&country=JP&media=podcast&entity=podcastEpisode&limit=200`