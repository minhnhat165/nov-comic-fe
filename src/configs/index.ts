export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'My App';
export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000';

export const CRAWLER_API_URL =
	process.env.CRAWLER_API_URL || 'http://localhost:3000/api/crawler';

export const COMIC_API_URL = DOMAIN + '/api/comics';
