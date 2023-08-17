import 'keen-slider/keen-slider.min.css';

import { ClockIcon, FireIcon } from '@heroicons/react/24/solid';

import { Comic } from '@/types/comic';
import { ComicCard } from '@/components/ui/comic-card';
import { ComicRecommend } from '@/components/comic-recommend';
import { DOMAIN } from '@/configs';
import { ListResponse } from '@/types/api';
import { Pagination } from '@/components/ui/pagination';
import { Typography } from '@/components/ui/typography';
import { redirect } from 'next/navigation';

const getRecommendComic = async (): Promise<ListResponse<Comic>> => {
	const res = await fetch(`${DOMAIN}/api/comics/recommendations`, {
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
}): Promise<ListResponse<Comic>> => {
	try {
		const url = `${DOMAIN}/api/comics/recently-updated?page=${page}}`;
		const res = await fetch(url, {
			next: {
				revalidate: 180,
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

interface HomeProps {
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home(props: HomeProps) {
	// const recommend = await getRecommendComic();
	// const { items } = recommend.data;
	const { searchParams } = props;
	const page = searchParams.page ? Number(searchParams.page) : 1;
	const newComics = await getRecentUpdate({ page });
	const { items: comics, currentPage, totalPages } = newComics.data;

	return (
		<main className="flex flex-col gap-4">
			{/* <section className="flex flex-col gap-2">
				<div className="flex items-center gap-1">
					<FireIcon className="w-6 h-6 inline-block text-primary" />
					<Typography variant="h4" weight="semibold">
						Recommend
					</Typography>
				</div>
				<ComicRecommend data={items} /> */}
			{/* </section> */}
			<section className="flex flex-col gap-2">
				<div className="flex items-center gap-1">
					<ClockIcon className="w-6 h-6 inline-block text-primary" />
					<Typography variant="h4" weight="semibold">
						Recently Updated
					</Typography>
				</div>
				<div className="grid grid-cols-2 gap-2 gap-y-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{comics.map((comic) => (
						<div key={comic.id}>
							<ComicCard data={comic} />
						</div>
					))}
				</div>

				<div className="my-4">
					<Pagination activePage={currentPage} count={totalPages} />
				</div>
			</section>
		</main>
	);
}
