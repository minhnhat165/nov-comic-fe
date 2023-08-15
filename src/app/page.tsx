import 'keen-slider/keen-slider.min.css';

import { COMIC_API_URL } from '@/configs';
import { Comic } from '@/types/comic';
import { ComicCard } from '@/components/ui/comic-card';
import { ComicRecommend } from '@/components/comic-recommend';
import { ListResponse } from '@/types/api';
import { Pagination } from '@/components/ui/pagination';
import { Typography } from '@/components/ui/typography';
import { redirect } from 'next/navigation';

const getRecommendComic = async (): Promise<Comic[]> => {
	const res = await fetch(`${COMIC_API_URL}/recommend-comics`, {
		next: {
			revalidate: 600,
		},
	});
	const data = await res.json();
	return data;
};

const getRecentUpdate = async ({
	page,
}: {
	page: number;
}): Promise<ListResponse<Comic, 'comics'>> => {
	try {
		const res = await fetch(
			`${COMIC_API_URL}/recent-update-comics?page=${page}`,
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

interface HomeProps {
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home(props: HomeProps) {
	const data = await getRecommendComic();
	const { searchParams } = props;
	const page = searchParams.page ? Number(searchParams.page) : 1;
	const newComics = await getRecentUpdate({ page });
	const { comics, current_page, total_pages } = newComics;

	return (
		<main className="flex flex-col gap-4">
			<section className="flex flex-col gap-2">
				<Typography
					variant="h4"
					className="text-primary"
					weight="semibold"
				>
					Recommend
				</Typography>
				<ComicRecommend data={data} />
			</section>
			<section className="flex flex-col gap-2">
				<Typography
					variant="h4"
					className="text-primary"
					weight="semibold"
				>
					Recent Update
				</Typography>
				<div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{comics.map((comic) => (
						<div key={comic.id}>
							<ComicCard data={comic} />
						</div>
					))}
				</div>

				<div className="my-4">
					<Pagination activePage={current_page} count={total_pages} />
				</div>
			</section>
		</main>
	);
}
