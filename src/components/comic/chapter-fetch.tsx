'use client';

import { Chapter } from '@/types/comic';
import { ChapterList } from './chapter-list';
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

	return <ChapterList chapters={chapters} comicId={id} />;
};
