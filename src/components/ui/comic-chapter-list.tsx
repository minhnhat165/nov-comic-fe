'use client';

import {
	ArrowDownCircleIcon,
	ArrowUpCircleIcon,
	DocumentTextIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useRef } from 'react';

import { Button } from './button';
import { Card } from './card';
import { Chapter } from '@/types/comic';
import Link from 'next/link';
import { Typography } from './typography';
import { cn } from '@/utils/tw';

export interface ComicChapterListProps {
	data: Chapter[];
	comicId: string;
	currentChapterId?: number;
}

export const ComicChapterList = (props: ComicChapterListProps) => {
	const topRef = useRef<HTMLDivElement>(null);
	const bottomRef = useRef<HTMLDivElement>(null);
	const scrollToTop = () => {
		topRef.current?.scrollIntoView({ behavior: 'smooth' });
	};
	const scrollToBottom = () => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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
				{props.data.map((chapter) => {
					const isActive =
						chapter.id.toString() ===
						props.currentChapterId?.toString();
					return (
						<div
							key={chapter.id}
							ref={isActive ? activeChapterRef : undefined}
						>
							<Link
								href={`/comics/${props.comicId}/${chapter.id}`}
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
		<div className="w-full p-4 border-b last:border-0 group">
			<Typography
				variant="caption"
				weight="bold"
				className={cn(
					'group-hover:!text-primary',
					isActive ? '!text-primary' : '',
				)}
			>
				<DocumentTextIcon
					className={cn(
						'w-3 h-3 inline-block',
						isActive ? '!text-primary' : '',
					)}
				/>{' '}
				{data.name}
			</Typography>
		</div>
	);
};
