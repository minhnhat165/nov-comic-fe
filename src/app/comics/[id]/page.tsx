import 'keen-slider/keen-slider.min.css';

import { Comic } from '@/types/comic';
import { ComicDetails } from '@/components/ui/comic-details';
import { DOMAIN } from '@/configs';
import { redirect } from 'next/navigation';

const getComicDetail = async ({
	id,
}: {
	id: string;
}): Promise<{
	data: Comic;
}> => {
	try {
		const res = await fetch(`${DOMAIN}/comics/${id}`, {
			next: {
				revalidate: 600,
			},
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
	const data = await getComicDetail({ id });

	const comic = data.data;

	return {
		title: comic.name,
		description: comic.description,
		image: comic.thumbnail,
	};
}

export default async function ComicDetail(props: ComicDetailProps) {
	const { id } = props.params;
	const data = await getComicDetail({ id });
	const comic = data.data;

	return (
		<main className="flex flex-col gap-6 px-2 py-4">
			<ComicDetails data={comic} />
		</main>
	);
}
