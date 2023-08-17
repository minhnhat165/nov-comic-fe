import * as cheerio from 'cheerio';

import { NextRequest, NextResponse } from 'next/server';

import { CRAWLER_API_URL } from '@/configs';
import { Chapter } from '@/types/comic';
import { convertViToEn } from '@/utils/vn2en';

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const res = await fetch(`${CRAWLER_API_URL}/truyen-tranh/${params.id}`);
		const htmlString = await res.text();
		const $ = cheerio.load(htmlString);

		const $chapters = $('.list-chapter li');
		const chapters: Chapter[] = $chapters
			.map((_, chapter) => {
				const $chapter = $(chapter);
				const id = $chapter
					.find('a')
					.attr('href')
					?.split('/')
					.pop() as string;
				const name = $chapter.find('a').text().trim();
				const updatedAt = $chapter
					.find('div')
					.last()
					.prev()
					.text()
					.trim();
				const viewCount = $chapter.find('div').last().text().trim();
				const slug = convertViToEn(name)
					.toLowerCase()
					.replace(/ /g, '-');
				return { id, name, updatedAt, viewCount, slug };
			})
			.get();

		return NextResponse.json({
			data: chapters,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.error();
	}
}
