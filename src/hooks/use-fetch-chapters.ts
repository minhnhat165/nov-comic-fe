'use client';

import { DOMAIN } from '@/configs';
import { useQuery } from '@tanstack/react-query';

export const fetchChapter = async (id: string) => {
	const res = await fetch(`${DOMAIN}/api/comics/${id}/chapters`);
	return res.json();
};
export const useFetchChapters = (comicId: string) => {
	return useQuery(['chapter', { id: comicId }], () => fetchChapter(comicId), {
		enabled: !!comicId,
	});
};
