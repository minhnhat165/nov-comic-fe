import 'keen-slider/keen-slider.min.css';

import { COMIC_API_URL } from '@/configs';
import { Comic } from '@/types/comic';
import { ComicChapterList } from '@/components/ui/comic-chapter-list';
import { ComicDetails } from '@/components/ui/comic-details';
import { redirect } from 'next/navigation';

const getComicDetail = async ({ id }: { id: string }): Promise<Comic> => {
	try {
		const res = await fetch(`${COMIC_API_URL}/comics/${id}`, {
			// next: {
			// 	revalidate: 600,
			// },
		});
		const data = await res.json();

		if ('status' in data && data.status === 404) {
			redirect('/not-found');
		}

		return data;
	} catch (error) {
		redirect('/not-found');
	}
};

interface ComicDetailProps {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: ComicDetailProps) {
	const { id } = params;
	const comic = await getComicDetail({ id });

	return {
		title: comic.title,
		description: comic.description,
		image: comic.thumbnail,
	};
}

export default async function ComicDetail(props: ComicDetailProps) {
	const { id } = props.params;
	const comic = await getComicDetail({ id });

	return (
		<main className="flex flex-col gap-6 px-2 py-4">
			<ComicDetails data={comic} />
			<div>
				<ComicChapterList
					comicId={comic.id}
					data={comic?.chapters || []}
				/>
			</div>
		</main>
	);
}
