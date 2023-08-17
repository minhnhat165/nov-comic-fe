import 'keen-slider/keen-slider.min.css';

import { Chapter, Comic, PageChapter } from '@/types/comic';

import { ChapterBar } from '@/components/chapter-bar';
import { DOMAIN } from '@/configs';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

const getComicChapter = async ({
	comicId,
	chapterSlug,
	chapterId,
}: {
	comicId: string;
	chapterSlug: string;
	chapterId: string;
}): Promise<{
	data: {
		items: PageChapter[];
		comic: Comic;
		chapter: Chapter;
	};
}> => {
	try {
		const url = `${DOMAIN}/api/comics/${comicId}/${chapterSlug}/${chapterId}`;
		const res = await fetch(url);
		const data = await res.json();

		if ('status' in data && data.status === 404) {
			redirect('/not-found');
		}

		return {
			...data,
			data: {
				...data.data,
				chapter_name: chapterId[0],
				comic_name: comicId,
			},
		};
	} catch (error) {
		redirect('/not-found');
	}
};

interface ComicChapterProps {
	params: {
		id: string;
		chapterSlug: string;
		chapterId: string;
	};
}

// export async function generateMetadata({
// 	params,
// }: ComicChapterProps): Promise<Metadata> {
// 	const { id, chapterId, chapterSlug } = params;
// 	const res = await getComicChapter({ comicId: id, chapterId, chapterSlug });
// 	const { chapter, comic } = res.data;
// 	return {
// 		title: `${comic.name} - ${chapter.name}`,
// 		openGraph: {
// 			images: [
// 				{
// 					url: comic.thumbnail,
// 					width: 500,
// 					height: 500,
// 					alt: comic.name,
// 				},
// 			],
// 		},
// 	};
// }

export default async function ComicChapter(props: ComicChapterProps) {
	const { id, chapterId, chapterSlug } = props.params;
	const { data } = await getComicChapter({
		comicId: id,
		chapterId,
		chapterSlug,
	});

	const { items: pageChapters } = data;

	return (
		<main className="flex flex-col gap-6">
			<div>
				{pageChapters.map((page) => (
					<div key={page.id} className="relative">
						<img
							// quality={100}
							src={page.src}
							alt={page.id}
							height={500}
							width={500}
							className="object-cover"
						/>
					</div>
				))}
			</div>
			<ChapterBar comicId={id} currentChapterId={chapterId} />
		</main>
	);
}
