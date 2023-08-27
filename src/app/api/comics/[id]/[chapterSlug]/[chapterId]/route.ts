import { Comic, PageChapter } from '@/types/comic';
import { NextRequest, NextResponse } from 'next/server';

import { genScrapeImgUrl } from '@/utils/gen-scrape-img';
import { getScrape } from '@/utils/get-scrape';

export const dynamic = 'force-dynamic';
export async function GET(
	req: NextRequest,
	{
		params,
	}: { params: { id: string; chapterId: string; chapterSlug: string } },
) {
	try {
		const url =
			'/truyen-tranh/' +
			params.id +
			'/' +
			params.chapterSlug +
			'/' +
			params.chapterId;
		const $ = await getScrape(url);
		const pagesChapter: PageChapter[] = $('.page-chapter img')
			.map(function () {
				const $this = $(this);
				const id = $this.attr('data-index') as string;
				const name = $this.attr('alt') as string;
				let src = genScrapeImgUrl($this.attr('src') as string);
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
					id: params.chapterId,
					name: $('.breadcrumb li').last().text().trim(),
					slug: params.chapterSlug,
				},
			},
		});
	} catch (error) {
		console.log(error);
		return NextResponse.error();
	}
}
