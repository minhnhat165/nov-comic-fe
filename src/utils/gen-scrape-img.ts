import { DOMAIN } from '@/configs';

export const genScrapeImgUrl = (src: string) => {
	if (src.startsWith('//')) {
		src = 'https:' + src;
	}
	const baseUrl = `${DOMAIN}/image?data=${src}`;
	return baseUrl;
};
