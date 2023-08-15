type PageInfo = {
	total_pages: number;
	current_page: number;
};

export type ErrorResponse = {
	status: number;
	message: string;
};

export type ListResponse<T, Key extends string = 'data'> = {
	[K in Key]: T[];
} & PageInfo;
