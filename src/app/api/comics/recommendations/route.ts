import { Chapter, Comic } from '@/types/comic';
import { NextRequest, NextResponse } from 'next/server';

import { ListResponse } from '@/types/api';
import { convertViToEn } from '@/utils/vn2en';
import { getScrape } from '@/utils/get-scrape';

export async function GET(req: NextRequest) {
	try {
		const $ = await getScrape('');
		const comics: Comic[] = [];
		$('.items-slide .item').map(function () {
			const comic = {} as Comic;
			const $this = $(this);
			const $caption = $this.find('.slide-caption');
			const $thumbnail = $caption.prev();
			const url = $thumbnail.attr('href') as string;
			const lastPath = url?.split('/').pop() as string;
			comic.id = lastPath?.split('-').slice(0, -1).join('-');
			comic.thumbnail = $thumbnail.find('img').attr('data-src') as string;
			if (comic.thumbnail.startsWith('//')) {
				comic.thumbnail = 'https:' + comic.thumbnail;
			}
			comic.name = $thumbnail.attr('title') as string;

			const $chapter = $caption.find('h3').next();
			comic.newestChapter = {} as Chapter;
			comic.newestChapter.name = $chapter.text().trim();
			comic.newestChapter.slug = convertViToEn(comic.newestChapter.name)
				.toLowerCase()
				.replace(/ /g, '-');
			comic.newestChapter.id = $chapter
				.attr('href')
				?.split('/')
				.pop() as string;
			comic.newestChapter.updatedAt = $caption
				.find('.time')
				.text()
				.trim();
			comics.push(comic);
		});

		const dataResponse: ListResponse<Comic> = {
			data: {
				items: comics,
				currentPage: 1,
				totalPages: 1,
			},
		};

		return NextResponse.json(dataResponse);
	} catch (error) {
		console.log(error);
		return NextResponse.error();
	}
}
