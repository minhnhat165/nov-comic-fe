'use client';

import {
	ArrowLeftCircleIcon,
	ArrowRightCircleIcon,
	ChevronDownIcon,
	InformationCircleIcon,
} from '@heroicons/react/24/solid';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

import { Button } from '../ui/button';
import { Chapter } from '@/types/comic';
import { ComicChapterList } from '../ui/comic-chapter-list';
import Link from 'next/link';
import { cn } from '@/utils/tw';
import { useHideOnScroll } from '@/hooks/use-hide-on-scroll';
import { useMemo } from 'react';

export interface ChapterBarProps {
	comicId: string;
	currentChapterId: number;
	chapters: Chapter[];
}

export const ChapterBar = (props: ChapterBarProps) => {
	const { visible } = useHideOnScroll();
	const { currentChapterId, chapters } = props;

	const currentChapter = useMemo(() => {
		return chapters.find((chapter) => {
			return chapter.id.toString() === currentChapterId.toString();
		});
	}, [chapters, currentChapterId]);

	const prevChapter = useMemo(() => {
		const index = chapters.findIndex((chapter) => {
			return chapter.id.toString() === currentChapterId.toString();
		});

		return chapters[index + 1];
	}, [chapters, currentChapterId]);

	const nextChapter = useMemo(() => {
		const index = chapters.findIndex((chapter) => {
			return chapter.id.toString() === currentChapterId.toString();
		});

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
					'flex justify-between items-center h-12 px-4 bg-primary/5 shadow',
				)}
			>
				{' '}
				<Link href={`/comics/${props.comicId}`}>
					<Button variant="outline" size="icon">
						<InformationCircleIcon className="w-6 h-6" />
					</Button>
				</Link>
				<Link href={`/comics/${props.comicId}/${prevChapter?.id}`}>
					<Button
						disabled={
							currentChapter?.id.toString() ===
							chapters[chapters.length - 1].id.toString()
						}
						size="icon"
					>
						<ArrowLeftCircleIcon className="w-6 h-6" />
					</Button>
				</Link>
				<Dialog>
					<DialogTrigger asChild>
						<div className="p-2 bg-white rounded-sm flex gap-2 max-w-[120px]">
							<div>
								<span className="text-sm text-primary/80 line-clamp-1">
									{currentChapter?.name}
								</span>
							</div>
							<ChevronDownIcon className="text-primary w-6 h-6" />
						</div>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px] p-0">
						<ComicChapterList
							currentChapterId={currentChapterId}
							comicId={props.comicId}
							data={chapters}
						/>
					</DialogContent>
				</Dialog>
				<Link href={`/comics/${props.comicId}/${nextChapter?.id}`}>
					<Button
						disabled={currentChapter?.id === chapters[0].id}
						size="icon"
					>
						<ArrowRightCircleIcon className="w-6 h-6" />
					</Button>
				</Link>
			</div>
		</div>
	);
};
