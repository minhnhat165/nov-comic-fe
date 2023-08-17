'use client';

import {
	ArrowDownCircleIcon,
	ArrowUpCircleIcon,
	ClockIcon,
	DocumentTextIcon,
	EyeIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useRef } from 'react';

import { Button } from './button';
import { Card } from './card';
import { Chapter } from '@/types/comic';
import Link from 'next/link';
import { Typography } from './typography';
import { cn } from '@/utils/tw';
import { genChapterLink } from '@/utils/gen-chapter-link';

export interface ComicChapterListProps {
	comicId: string;
	chapters: Chapter[];
	currentChapterId?: string | undefined;
}
export const ComicChapterList = (props: ComicChapterListProps) => {
	const topRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);
	const scrollToTop = () => {
		topRef.current?.scrollIntoView({ behavior: 'instant' });
	};
	const scrollToBottom = () => {
		bottomRef.current?.scrollIntoView({ behavior: 'instant' });
	};
	// Create a ref for the active chapter
	const activeChapterRef = useRef<HTMLDivElement>(null);

	// Scroll the active chapter into view
	const scrollActiveChapterIntoView = () => {
		activeChapterRef.current?.scrollIntoView({
			behavior: 'instant',
			block: 'center',
		});
	};

	useEffect(() => {
		scrollActiveChapterIntoView();
	}, [props.currentChapterId]);

	return (
		<Card>
			<div className="flex justify-between p-2 items-center border-b border-primary">
				Chapters
				<div className="flex gap-2">
					<Button size="icon" onClick={scrollToTop}>
						<ArrowUpCircleIcon className="w-5 h-5" />
					</Button>
					<Button size="icon" onClick={scrollToBottom}>
						<ArrowDownCircleIcon className="w-5 h-5" />
					</Button>
				</div>
			</div>
			<div className="max-h-[70vh] overflow-y-scroll">
				<div ref={topRef} className="h-full w-1" />
				{props.chapters.map((chapter) => {
					const isActive =
						chapter.id.toString() ===
						props.currentChapterId?.toString();
					return (
						<div
							key={chapter.id}
							ref={isActive ? activeChapterRef : undefined}
							className={cn(
								'border-b ',
								isActive ? 'bg-primary text-white' : '',
							)}
						>
							<Link
								href={genChapterLink({
									comicId: props.comicId,
									chapterId: chapter.id.toString(),
									chapterSlug: chapter.slug,
								})}
								key={chapter.id}
							>
								<ChapterItem
									isActive={isActive}
									key={chapter.id}
									data={chapter}
								/>
							</Link>
						</div>
					);
				})}
				<div ref={bottomRef} className="h-full w-1" />
			</div>
		</Card>
	);
};

const ChapterItem = ({
	data,
	isActive = false,
}: {
	data: Chapter;
	isActive?: boolean;
}) => {
	return (
		<div className="w-full p-2 flex ">
			<div className={`flex items-center gap-1`}>
				<div className="w-3 h-3">{<DocumentTextIcon />}</div>
				<Typography variant="body2" weight="semibold">
					{data.name}
				</Typography>
			</div>

			<div className="ml-auto flex items-end flex-col">
				<IconText icon={<EyeIcon />} text={data.viewCount} />
				<IconText icon={<ClockIcon />} text={data.updatedAt} />
			</div>
		</div>
	);
};

const IconText = ({
	icon,
	text,
	className = '',
}: {
	icon: React.ReactNode;
	text: string | undefined;
	className?: string;
}) => {
	if (!text) return null;
	return (
		<div className={`flex items-center  gap-1 ${className}`}>
			<Typography variant="body2">{text}</Typography>
			<div className="w-3 h-3">{icon}</div>
		</div>
	);
};
