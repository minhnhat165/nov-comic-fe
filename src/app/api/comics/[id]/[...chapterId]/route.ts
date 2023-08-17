import * as cheerio from 'cheerio';

import { Comic, PageChapter } from '@/types/comic';
import { NextRequest, NextResponse } from 'next/server';

import { CRAWLER_API_URL } from '@/configs';

export const dynamic = 'force-dynamic';
export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string; chapterId: string[] } },
) {
	try {
		const path = params.chapterId.join('/');

		const res = await fetch(
			`${CRAWLER_API_URL}/truyen-tranh/${params.id}/${path}`,
		);
		const htmlString = await res.text();
		const $ = cheerio.load(htmlString);
		const pagesChapter: PageChapter[] = $('.page-chapter img')
			.map(function () {
				const $this = $(this);
				const id = $this.attr('data-index') as string;
				const name = $this.attr('alt') as string;
				let src = $this.attr('src') as string;
				if (src.startsWith('//')) {
					src = 'https:' + src;
				}

				return { id, name, src };
			})
			.get();

		return NextResponse.json({
			data: {
				items: pagesChapter,
				comic: {
					id: params.id,
					name: $('.breadcrumb li').last().prev().text().trim(),
					slug: params.id,
					thumbnail: ('https:' +
						$('.detail-info img').attr('src')) as string,
					description: $('.detail-info .detail-content')
						.text()
						.trim(),
				} as Comic,
				chapter: {
					id: params.chapterId[1],
					name: $('.breadcrumb li').last().text().trim(),
					slug: params.chapterId[0],
				},
			},
		});
	} catch (error) {
		console.log(error);
		return NextResponse.error();
	}
}
