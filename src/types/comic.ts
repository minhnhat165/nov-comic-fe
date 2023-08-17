export type PageChapter = {
	id: string;
	name: string;
	src: string;
};
export type Chapter = {
	id: string;
	name: string;
	slug: string;
	updatedAt?: string;
	viewCount?: string;
};
export type Genre = {
	id: string;
	name: string;
	slug?: string;
};
export type Comic = {
	id: string;
	name: string;
	thumbnail: string;
	slug?: string;
	newestChapter?: Chapter;
	newestChapters?: Chapter[];
	isTrending?: boolean;
	viewCount?: string;
	followerCount?: string;
	author?: string;
	genres?: Genre[];
	status?: string;
	otherNames?: string[];
	chapters?: Chapter[];
	commentCount?: string;
	updatedAt?: string;
	rating?: number;
	description?: string;
};
