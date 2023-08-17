type PageInfo = {
	totalPages: number;
	currentPage: number;
};

export type ErrorResponse = {
	status: number;
	message: string;
};

export type ListResponse<T> = {
	data: {
		items: T[];
	} & PageInfo;
};
