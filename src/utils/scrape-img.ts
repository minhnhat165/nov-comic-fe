import axios from 'axios';
import cloudscraper from 'cloudscraper';

export async function scrapeImg(url: string) {
	try {
		const res = await cloudscraper(url);
		console.log(res);
		return res;
	} catch (err) {
		console.log(err);
	}
}

// npm install axios
