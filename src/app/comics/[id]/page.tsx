import 'keen-slider/keen-slider.min.css';

import { EyeIcon, UsersIcon } from '@heroicons/react/24/solid';

import { Badge } from '@/components/ui/badge';
import { COMIC_API_URL } from '@/configs';
import { ChapterFetch } from '@/components/comic/chapter-fetch';
import { Comic } from '@/types/comic';
import { DescriptionBox } from '@/components/comic/description-box';
import Image from 'next/image';
import { ReadAction } from '@/components/comic/read-action';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/utils/tw';
import { redirect } from 'next/navigation';

const getComicDetail = async ({
	id,
}: {
	id: string;
}): Promise<{
	data: Comic;
}> => {
	try {
		const res = await fetch(`${COMIC_API_URL}/${id}`);
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
	const { genres = [], otherNames = [] } = comic;
	return (
		<main className="flex flex-col gap-6 px-2 py-4">
			<div className="flex flex-col items-center gap-4 pt-6">
				<div className="rounded-lg overflow-hidden shadow-primary shadow-sm relative">
					<Image
						loading="eager"
						src={comic.thumbnail}
						alt={comic.name}
						quality={100}
						width={180}
						height={200}
					/>
					<div className="absolute flex gap-4 bg-black/50 w-full bottom-0 p-1">
						<Typography
							variant="caption"
							className="text-white flex items-center text-xs"
						>
							<EyeIcon className="w-3 h-3 mr-2" />
							{comic.viewCount}
						</Typography>
						<Typography
							variant="caption"
							className="text-white flex items-center text-xs"
						>
							<UsersIcon className="w-3 h-3 mr-2" />
							{comic.followerCount}
						</Typography>
					</div>
				</div>
				<Typography variant="h3" align="center" weight="semibold">
					{comic.name}
				</Typography>
				<ReadAction comicId={comic.id} />
				<div className="flex flex-col gap-3 w-full">
					<Section title="Genres">
						<div className="flex flex-wrap gap-2">
							{genres.map((genre) => (
								<Badge key={genre.id} variant="secondary">
									{genre.name}
								</Badge>
							))}
						</div>
					</Section>
					<Section title="Description">
						<DescriptionBox data={comic?.description || ''} />
					</Section>
					<Section title="Author">
						<div className="flex flex-wrap gap-2">
							{comic?.author}
						</div>
					</Section>
					{otherNames.length > 0 && (
						<Section title="Other names">
							<div className="flex flex-wrap gap-2">
								{otherNames.map((name) => (
									<Typography key={name} variant="caption">
										{name}{' '}
										{name !==
											otherNames[otherNames.length - 1] &&
											','}
									</Typography>
								))}
							</div>
						</Section>
					)}
					<Section title="Status">
						<div className="flex flex-wrap gap-2">
							<Typography
								variant="caption"
								className={cn(
									comic?.status === 'Ongoing'
										? 'text-green-500'
										: 'text-red-500',
								)}
							>
								{comic?.status}
							</Typography>
						</div>
					</Section>
				</div>
			</div>
			<div>
				<ChapterFetch id={comic.id} />
			</div>
		</main>
	);
}

const Section = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => {
	return (
		<div>
			<Typography variant="h5" weight="semibold">
				{title}
			</Typography>
			{children}
		</div>
	);
};
