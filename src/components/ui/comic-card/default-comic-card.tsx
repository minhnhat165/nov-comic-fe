import { Comic } from '@/types/comic';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/ui/typography';

export interface DefaultComicCardProps {
	data: Comic;
}

export const DefaultComicCard = ({ data }: DefaultComicCardProps) => {
	return (
		<div className="p-0 h-52 rounded overflow-hidden relative shadow">
			<Link href={`comics/${data.id}`}>
				<Image
					src={data.thumbnail}
					fill
					sizes="100%"
					className="object-cover"
					quality={100}
					alt={data.title}
				/>
			</Link>

			<div className="absolute w-full  bg-black/70 bottom-0 p-1">
				<Typography
					variant="h6"
					align="center"
					className="text-white line-clamp-1"
				>
					{data.title}
				</Typography>
				<div>
					<Typography
						variant="body2"
						align="center"
						className="text-white line-clamp-1"
					>
						<Link
							href={`comics/${data.id}/${
								data?.lastest_chapter?.id ||
								data?.last_chapter?.id
							}`}
						>
							{data.lastest_chapter?.name ||
								data.last_chapter?.name}
						</Link>
					</Typography>
				</div>
			</div>
		</div>
	);
};
