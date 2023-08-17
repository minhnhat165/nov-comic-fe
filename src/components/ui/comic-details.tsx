'use client';

import { Chapter, Comic } from '@/types/comic';
import { EyeIcon, UsersIcon } from '@heroicons/react/24/solid';

import { Badge } from './badge';
import { Button } from './button';
import { ComicChapterList } from './comic-chapter-list';
import Image from 'next/image';
import Link from 'next/link';
import { ShowMoreText } from './show-more-text';
import { Typography } from './typography';
import { cn } from '@/utils/tw';
import { genChapterLink } from '@/utils/gen-chapter-link';
import { useFetchChapters } from '@/hooks/use-fetch-chapters';
import { useMemo } from 'react';

export interface ComicDetailsProps {
	data: Comic;
}

export const ComicDetails = ({ data }: ComicDetailsProps) => {
	const genres = data?.genres || [];
	const otherNames = data?.otherNames || [];
	const { data: chaptersData } = useFetchChapters(data.id);
	const chapters = useMemo(() => {
		return (chaptersData?.data || []) as Chapter[];
	}, [chaptersData]);
	return (
		<>
			<div className="flex flex-col items-center gap-4 pt-6">
				<div className="rounded-lg overflow-hidden shadow-primary shadow-sm relative">
					<Image
						src={data.thumbnail}
						alt={data.name}
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
							{data.viewCount}
						</Typography>
						<Typography
							variant="caption"
							className="text-white flex items-center text-xs"
						>
							<UsersIcon className="w-3 h-3 mr-2" />
							{data.followerCount}
						</Typography>
					</div>
				</div>
				<Typography variant="h3" align="center" weight="semibold">
					{data.name}
				</Typography>
				<div className="gap-x-4 flex">
					<Link
						className="read-first"
						href={genChapterLink({
							comicId: data.id,
							chapterId: chapters[chapters.length - 1]?.id,
							chapterSlug: chapters[chapters.length - 1]?.slug,
						})}
					>
						<Button variant="default" size="sm">
							<EyeIcon className="w-4 h-4 mr-2" /> Read first
						</Button>
					</Link>
					<Link
						className="read-latest"
						href={genChapterLink({
							comicId: data.id,
							chapterId: chapters[0]?.id,
							chapterSlug: chapters[0]?.slug,
						})}
					>
						<Button variant="default" size="sm">
							<EyeIcon className="w-4 h-4 mr-2" /> Read latest
						</Button>
					</Link>
				</div>
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
						<ShowMoreText text={data?.description || ''} />
					</Section>
					<Section title="Author">
						<div className="flex flex-wrap gap-2">
							{data?.author}
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
									data?.status === 'Ongoing'
										? 'text-green-500'
										: 'text-red-500',
								)}
							>
								{data?.status}
							</Typography>
						</div>
					</Section>
				</div>
			</div>
			<div>
				<ComicChapterList chapters={chapters} comicId={data.id} />
			</div>
		</>
	);
};

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
