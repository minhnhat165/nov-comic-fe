'use client';

import { Button } from '@/components/ui/button';
import { Chapter } from '@/types/comic';
import { EyeIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { genChapterLink } from '@/utils/gen-chapter-link';
import { useFetchChapters } from '@/hooks/use-fetch-chapters';
import { useMemo } from 'react';

export interface ReadActionProps {
	comicId: string;
}

export const ReadAction = ({ comicId }: ReadActionProps) => {
	const { data: chaptersData } = useFetchChapters(comicId);
	const chapters = useMemo(() => {
		return (chaptersData?.data || []) as Chapter[];
	}, [chaptersData]);
	return (
		<div className="gap-x-4 flex">
			<Link
				className="read-first"
				href={genChapterLink({
					comicId: comicId,
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
					comicId: comicId,
					chapterId: chapters[0]?.id,
					chapterSlug: chapters[0]?.slug,
				})}
			>
				<Button variant="default" size="sm">
					<EyeIcon className="w-4 h-4 mr-2" /> Read latest
				</Button>
			</Link>
		</div>
	);
};
