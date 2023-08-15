export type Chapter = {
	id: number;
	name: string;
};

type genre = {
	id: number;
	name: string;
};
export type Comic = {
	id: string;
	title: string;
	thumbnail: string;
	updated_at: string;
	last_chapter: Chapter;
	lastest_chapter: Chapter;
	description?: string;
	genres?: genre[];
	authors?: string;
	status?: string;
	other_names?: string[];
	total_views?: number;
	followers?: number;
	chapters?: Chapter[];
};
