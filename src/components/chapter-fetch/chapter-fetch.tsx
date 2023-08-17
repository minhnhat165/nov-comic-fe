'use client';

import { Chapter } from '@/types/comic';
import { ComicChapterList } from '@/components/ui/comic-chapter-list';
import { useFetchChapters } from '@/hooks/use-fetch-chapters';
import { useMemo } from 'react';

export interface ChapterFetchProps {
	id: string;
	currentChapterId?: string | undefined;
}

export const ChapterFetch = ({ id }: ChapterFetchProps) => {
	const { data } = useFetchChapters(id);
	const chapters = useMemo(() => {
		return (data?.data as Chapter[]) || ([] as Chapter[]);
	}, [data]);

	return <ComicChapterList chapters={chapters} comicId={id} />;
};
