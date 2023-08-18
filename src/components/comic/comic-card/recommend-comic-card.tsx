import { Comic } from '@/types/comic';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '../../ui/typography';
import { genChapterLink } from '@/utils/gen-chapter-link';

export interface RecommendComicCardProps {
	data: Comic;
}

export const RecommendComicCard = ({ data }: RecommendComicCardProps) => {
	const chapter = data?.newestChapter;
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
					</div>
				</Link>
			</div>
			<div className="bg-slate-900 px-0.5 sm:px-4 py-2">
				{chapter && (
					<Link
						key={chapter.id}
						href={genChapterLink({
							comicId: data.id,
							chapterId: chapter.id,
							chapterSlug: chapter.slug,
						})}
						className="p-1 flex justify-between"
					>
						<Typography className="text-slate-100 line-clamp-1 text-xs">
							{chapter.name}
						</Typography>
						<Typography className="text-slate-100 line-clamp-1 text-xs">
							{chapter.updatedAt}
						</Typography>
					</Link>
				)}
			</div>
		</div>
	);
};
