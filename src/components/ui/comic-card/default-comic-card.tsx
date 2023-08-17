import { EyeIcon, UsersIcon } from '@heroicons/react/24/solid';

import { Badge } from '../badge';
import { Comic } from '@/types/comic';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography';
import { genChapterLink } from '@/utils/gen-chapter-link';

export interface DefaultComicCardProps {
	data: Comic;
}

export const DefaultComicCard = ({ data }: DefaultComicCardProps) => {
	return (
		<div className="rounded overflow-hidden border">
			<div className="p-0 h-52 relative ">
				<Link href={`comics/${data.id}`}>
					<Image
						src={data.thumbnail}
						fill
						sizes="100%"
						className="object-cover"
						quality={100}
						alt={data.name}
					/>
				</Link>
				<Link href={`comics/${data.id}`}>
					<div className="absolute top-1/2 bottom-0 inset-x-0 flex flex-col justify-end px-2 sm:px-4 py-2 bg-gradient-to-b from-transparent to-slate-900">
						<Typography
							variant="h6"
							align="center"
							className="text-white line-clamp-1"
						>
							{data.name}
						</Typography>
						<Separator />
						{data?.genres && data.genres.length > 0 && (
							<Typography
								title={data.genres.join(' | ')}
								variant="caption"
								align="center"
								className="text-slate-300 line-clamp-1"
							>
								{data.genres.map((genre, index) => {
									if (index === data!.genres!.length - 1) {
										return genre.name;
									}
									return `${genre.name} | `;
								})}
							</Typography>
						)}
						<div className="flex justify-evenly">
							<Badge variant="destructive">
								<EyeIcon className="w-3 h-3 mr-1" />
								{data.viewCount}
							</Badge>
							<Badge variant="destructive">
								<UsersIcon className="w-3 h-3 mr-1" />
								{data.followerCount}
							</Badge>
						</div>
					</div>
				</Link>
			</div>
			<div className="bg-slate-900 px-0.5 sm:px-4 py-2">
				{data?.newestChapters &&
					data?.newestChapters?.length > 0 &&
					data.newestChapters.map((chapter) => (
						<Link
							key={chapter.id}
							href={genChapterLink({
								comicId: data.id,
								chapterId: chapter.id.toString(),
								chapterSlug: chapter.slug,
							})}
							className="p-1 flex justify-between hover:text-primary"
						>
							<Typography className="text-slate-100 line-clamp-1 text-xs">
								{chapter.name}
							</Typography>
							<Typography className="text-slate-100 line-clamp-1 text-xs">
								{chapter.updatedAt}
							</Typography>
						</Link>
					))}
			</div>
		</div>
	);
};
