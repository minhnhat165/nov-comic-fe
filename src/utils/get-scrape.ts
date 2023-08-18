import * as cheerio from 'cheerio';

import { CRAWLER_API_URL } from '@/configs';
import cloudscraper from 'cloudscraper';

export async function getScrape(url: string) {
	const crawlerApiUrl = CRAWLER_API_URL + url;

	// const res = await fetch(crawlerApiUrl);
	// const htmlString = await res.text();
	// return cheerio.load(htmlString);

	const htmlString = await cloudscraper(crawlerApiUrl);
	return cheerio.load(htmlString);

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
}
