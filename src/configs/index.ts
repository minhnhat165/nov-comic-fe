export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'My App';
export const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';
export const COMIC_API_URL =
	process.env.COMIC_API_URL ||
	'https://gateway.marvel.com:443/v1/public/comics';

export const CRAWLER_API_URL =
	process.env.CRAWLER_API_URL || 'http://localhost:3000/api/crawler';
