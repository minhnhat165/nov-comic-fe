import * as cheerio from 'cheerio';

import { CRAWLER_API_URL } from '@/configs';
import axios from 'axios';

export async function getScrape(url: string) {
	const crawlerApiUrl = CRAWLER_API_URL;
	// const apiKey = 'ebefc08bae7c843cb4dc7138473d9a71d515a614';
	// const res = await axios({
	// 	url: 'https://api.zenrows.com/v1/',
	// 	method: 'GET',
	// 	params: {
	// 		url: crawlerApiUrl + url,
	// 		apikey: apiKey,
	// 	},
	// });
	// const htmlString = await res.data;
	const res = await fetch(crawlerApiUrl + url);
	const htmlString = await res.text();
	return cheerio.load(htmlString);
	// return new Promise((resolve, reject) => {
	//   cloudscraper.get(url, (error, response, body) => {
	//     if (error) {
	//       reject(error);
	//     } else {
	//       resolve(body);
	//     }
	//   });
	// });
}
