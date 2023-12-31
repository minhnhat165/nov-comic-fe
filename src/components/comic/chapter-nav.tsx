'use client';

import {
	ArrowLeftCircleIcon,
	ArrowRightCircleIcon,
	ChevronDownIcon,
	InformationCircleIcon,
} from '@heroicons/react/24/solid';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

import { Button } from '@/components/ui/button';
import { Chapter } from '@/types/comic';
import { ChapterList } from '@/components/comic/chapter-list';
import Link from 'next/link';
import { cn } from '@/utils/tw';
import { genChapterLink } from '@/utils/gen-chapter-link';
import { useFetchChapters } from '@/hooks/use-fetch-chapters';
import { useHideOnScroll } from '@/hooks/use-hide-on-scroll';
import { useMemo } from 'react';

export interface ChapterNavProps {
	comicId: string;
	currentChapterId?: string | undefined;
}

export const ChapterNav = (props: ChapterNavProps) => {
	const { visible } = useHideOnScroll();
	const { currentChapterId } = props;

	const { data } = useFetchChapters(props.comicId);
	const chapters = useMemo(() => {
		return (data?.data as Chapter[]) || ([] as Chapter[]);
	}, [data]);

	const currentChapter = useMemo(() => {
		return chapters.find((chapter) => {
			return chapter.id.toString() === currentChapterId;
		});
	}, [chapters, currentChapterId]);

	const prevChapter = useMemo(() => {
		const index = chapters.findIndex((chapter) => {
			return chapter.id.toString() === currentChapterId;
		});
		if (index === -1) {
			return undefined;
		}
		return chapters[index + 1];
	}, [chapters, currentChapterId]);

	const nextChapter = useMemo(() => {
		const index = chapters.findIndex((chapter) => {
			return chapter.id.toString() === currentChapterId;
		});

		if (index === -1) {
			return undefined;
		}

		return chapters[index - 1];
	}, [chapters, currentChapterId]);

	return (
		<div
			className={cn(
				'fixed bg-secondary bottom-0 left-0 right-0 z-10',
				visible
					? 'transform translate-y-0 transition-transform duration-200'
					: 'transform translate-y-full transition-transform duration-200',
			)}
		>
			<div
				className={cn(
					'flex gap-2 items-center h-12 px-4 bg-primary/5 shadow',
				)}
			>
				<Link href={`/comics/${props.comicId}`}>
					<Button variant="outline" size="icon">
						<InformationCircleIcon className="w-6 h-6" />
					</Button>
				</Link>
				<div className="flex flex-1 justify-center gap-2">
					<Link
						href={genChapterLink({
							comicId: props.comicId,
							chapterId: prevChapter?.id || '',
							chapterSlug: prevChapter?.slug || '',
						})}
					>
						<Button
							disabled={
								currentChapter?.id.toString() ===
								chapters[chapters.length - 1]?.id?.toString()
							}
							size="icon"
						>
							<ArrowLeftCircleIcon className="w-6 h-6" />
						</Button>
					</Link>
					<Dialog>
						<DialogTrigger asChild>
							<div className="p-2 bg-white rounded-sm flex items-center gap-2  w-[140px]">
								<span className="text-sm text-primary/80 line-clamp-1">
									{currentChapter?.name}
								</span>
								<ChevronDownIcon className="text-primary w-6 h-6" />
							</div>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px] p-0">
							<ChapterList
								currentChapterId={currentChapterId}
								comicId={props.comicId}
								chapters={chapters}
							/>
						</DialogContent>
					</Dialog>
					<Link
						href={genChapterLink({
							comicId: props.comicId,
							chapterId: nextChapter?.id || '',
							chapterSlug: nextChapter?.slug || '',
						})}
					>
						<Button
							disabled={
								currentChapter?.id.toString() ===
								chapters[0]?.id?.toString()
							}
							size="icon"
						>
							<ArrowRightCircleIcon className="w-6 h-6" />
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
