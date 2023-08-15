import localFont from 'next/font/local';

// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
export const poppinsVN = localFont({
	src: [
		{
			path: './poppins-vn/PoppinsVN-400.woff2',
			weight: '400',
		},
		{
			path: './poppins-vn/PoppinsVN-500.woff2',
			weight: '500',
		},
		{
			path: './poppins-vn/PoppinsVN-600.woff2',
			weight: '600',
		},
		{
			path: './poppins-vn/PoppinsVN-700.woff2',
			weight: '700',
		},
	],
});
