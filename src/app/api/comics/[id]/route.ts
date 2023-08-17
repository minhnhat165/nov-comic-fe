import * as cheerio from 'cheerio';

import { NextRequest, NextResponse } from 'next/server';

import { CRAWLER_API_URL } from '@/configs';
import { Comic } from '@/types/comic';

export const dynamic = 'force-dynamic';
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const res = await fetch(
			`${CRAWLER_API_URL}/truyen-tranh/${params.id}`,
			{
				cache: 'no-cache',
			},
		);
		const htmlString = await res.text();
		const $ = cheerio.load(htmlString);
		const comic = {} as Comic;
		comic.id = params.id;
		comic.name = $('.title-detail').text().trim();
		const $detailInfo = $('.detail-info');
		comic.thumbnail = $detailInfo
			.find('.col-image img')
			.attr('src') as string;
		if (comic.thumbnail.startsWith('//')) {
			comic.thumbnail = 'https:' + comic.thumbnail;
		}
		comic.author = $detailInfo
			.find('.col-info .author p')
			.last()
			.text()
			.trim();
		comic.status = $detailInfo
			.find('.col-info .status p')
			.last()
			.text()
			.trim();
		comic.genres = $detailInfo
			.find('.col-info .kind p')
			.last()
			.text()
			.split('-')
			.map((genre) => ({
				id: genre.trim(),
				name: genre.trim(),
			}));

		comic.otherNames = $detailInfo
			.find('.col-info .othername p')
			.last()
			.text()
			.trim()
			.split(';');

		comic.viewCount = $detailInfo
			.find('li')
			.last()
			.find('p')
			.last()
			.text()
			.trim();
		comic.followerCount = $detailInfo
			.find('.follow a')
			.next()
			.find('b')
			.text()
			.trim();

		comic.rating = parseFloat(
			$detailInfo.find('.rating .star').attr('data-rating') as string,
		);

		comic.description = $('.detail-content p').text().trim();

		return NextResponse.json({
			data: comic,
		});
	} catch (error) {
		let e = error as Error;
		return NextResponse.json({
			error: {
				message: e.message,
			},
		});
	}
}
