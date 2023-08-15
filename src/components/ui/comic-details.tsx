import { EyeIcon, UsersIcon } from '@heroicons/react/24/solid';

import { Badge } from './badge';
import { Button } from './button';
import { Comic } from '@/types/comic';
import Image from 'next/image';
import Link from 'next/link';
import { ShowMoreText } from './show-more-text';
import { Typography } from './typography';
import { cn } from '@/utils/tw';

export interface ComicDetailsProps {
	data: Comic;
}

export const ComicDetails = ({ data }: ComicDetailsProps) => {
	const genres = data?.genres || [];
	const otherNames = data?.other_names || [];
	const chapters = data?.chapters || [];
	return (
		<div className="flex flex-col items-center gap-4 pt-6">
			<div className="rounded-lg overflow-hidden shadow-primary shadow-sm relative">
				<Image
					src={data.thumbnail}
					alt={data.title}
					quality={100}
					width={180}
					height={200}
				/>
				<div className="absolute bg-black/50 w-full bottom-0 p-1">
					<Typography
						variant="caption"
						className="text-white flex items-center text-xs"
					>
						<EyeIcon className="w-3 h-3 mr-2" />
						{Intl.NumberFormat('en-US').format(
							data?.total_views || 0,
						)}{' '}
					</Typography>
					<Typography
						variant="caption"
						className="text-white flex items-center text-xs"
					>
						<UsersIcon className="w-3 h-3 mr-2" />
						{Intl.NumberFormat('en-US').format(
							data?.followers || 0,
						)}{' '}
					</Typography>
				</div>
			</div>
			<Typography variant="h3" weight="semibold">
				{data.title}
			</Typography>
			<div className="gap-x-4 flex">
				{chapters.length > 0 && (
					<>
						<Link
							href={`/comics/${data.id}/${
								chapters[chapters.length - 1].id
							}`}
						>
							<Button variant="default" size="sm">
								<EyeIcon className="w-4 h-4 mr-2" /> Read first
							</Button>
						</Link>

						<Link href={`/comics/${data.id}/${chapters[0].id}`}>
							<Button variant="default" size="sm">
								<EyeIcon className="w-4 h-4 mr-2" /> Read latest
							</Button>
						</Link>
					</>
				)}
			</div>
			<div className="flex flex-col gap-3">
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
					<div className="flex flex-wrap gap-2">{data?.authors}</div>
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
			<Typography variant="h4" weight="semibold">
				{title}
			</Typography>
			{children}
		</div>
	);
};
