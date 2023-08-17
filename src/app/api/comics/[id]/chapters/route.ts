import { NextRequest, NextResponse } from 'next/server';

import { Chapter } from '@/types/comic';
import { convertViToEn } from '@/utils/vn2en';
import { getScrape } from '@/utils/get-scrape';

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const url = '/truyen-tranh/' + params.id;
		const $ = await getScrape(url);

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
