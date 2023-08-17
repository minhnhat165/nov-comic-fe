export function genChapterLink({
	comicId,
	chapterSlug,
	chapterId,
}: {
	comicId: string;
	chapterSlug: string;
	chapterId: string;
}) {
	return `/comics/${comicId}/${chapterSlug}/${chapterId}`;
} // Path: src\utils\gen-comic-link.ts
