import * as cheerio from 'cheerio';

import { Chapter, Comic } from '@/types/comic';
import { NextRequest, NextResponse } from 'next/server';

import { CRAWLER_API_URL } from '@/configs';
import { ListResponse } from '@/types/api';
import { convertViToEn } from '@/utils/vn2en';

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl?.searchParams;
		let page = searchParams?.has('page')
			? parseInt(searchParams.get('page') as string)
			: 1;
		if (page < 1) page = 1;

		const res = await fetch(`${CRAWLER_API_URL}/?page=${page}`, {
			next: {
				revalidate: 60,
			},
		});
		const htmlString = await res.text();
		const $ = cheerio.load(htmlString);
		const comics: Comic[] = [];
		$('.items .item').map(function () {
			const comic = {} as Comic;
			const $this = $(this);
			comic.name = $this.find('.box_li .title').text().trim();
			const url = $this.find('a').attr('href') as string;
			const lastPath = url?.split('/').pop() as string;
			comic.id = lastPath?.split('-').slice(0, -1).join('-');
			comic.thumbnail = $this
				.find('.image a img')
				.first()
				.attr('data-original') as string;

			if (comic.thumbnail.startsWith('//')) {
				comic.thumbnail = 'https:' + comic.thumbnail;
			}

			$this.find('.message_main p').each(function () {
				const $this = $(this);
				const label = $this.find('label').text();
				const value = $this.text().replace(label, '');
				switch (label.toLowerCase()) {
					case 'tác giả:':
						comic.author = value.trim();
						break;
					case 'thể loại:':
						comic.genres = value.split(',').map((genre) => ({
							id: genre.trim(),
							name: genre.trim(),
						}));
						break;
					case 'tình trạng:':
						comic.status = value.trim();
						break;
					case 'lượt xem:':
						comic.viewCount = value.trim();
						break;
					case 'theo dõi:':
						comic.followerCount = value.trim();
						break;
					case 'tên khác:':
						comic.otherNames = value
							.split(';')
							.map((name) => name.trim());
						break;
					case 'bình luận:':
						comic.commentCount = value.trim();
					case 'ngày cập nhật:':
						comic.updatedAt = value.trim();
					default:
						break;
				}
			});
			comic.newestChapters = [];
			$this.find('li.chapter').each(function () {
				const $this = $(this);
				const chapter = {} as Chapter;
				chapter.id = $this.find('a').attr('data-id') as string;
				chapter.name = $this.find('a').attr('title') as string;
				chapter.updatedAt = $this.find('.time').text().trim();
				chapter.slug = convertViToEn(chapter.name)
					.toLowerCase()
					.replace(/ /g, '-');
				comic.newestChapters?.push(chapter);
			});

			comics.push(comic);
		});

		const $pagination = $('.pagination');
		let totalPages = 1;
		if ($pagination.length) {
			const $lastPage = $pagination.find('li').last();
			const lastPageUrl = $lastPage.find('a').attr('href') as string;
			const lastPage = lastPageUrl?.split('=').pop() as string;
			totalPages = parseInt(lastPage);
		}

		const dataResponse: ListResponse<Comic> = {
			data: {
				items: comics,
				currentPage: page,
				totalPages: totalPages,
			},
		};

		return NextResponse.json(dataResponse);
	} catch (error) {
		console.log(error);
		return NextResponse.error();
	}
}