import 'keen-slider/keen-slider.min.css';

import { COMIC_API_URL } from '@/configs';
import { Chapter } from '@/types/comic';
import { ChapterBar } from '@/components/chapter-bar';
import Image from 'next/image';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

const getComicChapter = async ({
	comicId,
	chapterId,
}: {
	comicId: string;
	chapterId: number;
}): Promise<{
	images: {
		page: number;
		src: string;
	}[];
	chapters: Chapter[];
	chapter_name: string;
	comic_name: string;
}> => {
	try {
		const res = await fetch(
			`${COMIC_API_URL}/comics/${comicId}/chapters/${chapterId}`,
			{
				next: {
					revalidate: 600,
				},
			},
		);
		const data = await res.json();

		if ('status' in data && data.status === 404) {
			redirect('/not-found');
		}

		return data;
	} catch (error) {
		redirect('/not-found');
	}
};

interface ComicChapterProps {
	params: {
		id: string;
		chapterId: number;
	};
}

export async function generateMetadata({
	params,
}: ComicChapterProps): Promise<Metadata> {
	const { id, chapterId } = params;
	const res = await getComicChapter({ comicId: id, chapterId });
	const { chapter_name, comic_name } = res;
	return {
		title: `${comic_name} - ${chapter_name}`,
	};
}

export default async function ComicChapter(props: ComicChapterProps) {
	const { id, chapterId } = props.params;
	const { images, chapters } = await getComicChapter({
		comicId: id,
		chapterId,
	});

	return (
		<main className="flex flex-col gap-6">
			<div>
				{images.map((image) => (
					<div key={image.page} className="relative">
						<Image
							key={image.page}
							quality={100}
							src={image.src}
							alt={`Page ${image.page}`}
							height={500}
							// width is screen width
							width={500}
							className="object-cover"
						/>
					</div>
				))}
			</div>
			<ChapterBar
				comicId={id}
				currentChapterId={chapterId}
				chapters={chapters}
			/>
		</main>
	);
}
