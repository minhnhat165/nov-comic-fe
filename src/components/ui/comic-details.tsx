import { EyeIcon, UsersIcon } from '@heroicons/react/24/solid';

import { Badge } from './badge';
import { Comic } from '@/types/comic';
import { ComicDetailButton } from '../comic-detail-buttons';
import Image from 'next/image';
import { ShowMoreText } from './show-more-text';
import { Typography } from './typography';
import { cn } from '@/utils/tw';

export interface ComicDetailsProps {
	data: Comic;
}

export const ComicDetails = ({ data }: ComicDetailsProps) => {
	const genres = data?.genres || [];
	const otherNames = data?.otherNames || [];

	return (
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
			<ComicDetailButton comicId={data.id} />
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
					<div className="flex flex-wrap gap-2">{data?.author}</div>
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
			<Typography variant="h5" weight="semibold">
				{title}
			</Typography>
			{children}
		</div>
	);
};
