/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'nettruyennew.com',
			},
			{
				protocol: 'https',
				hostname: 'comics-api.vercel.app',
			},
			{
				protocol: 'https',
				hostname: 'st.nettruyenmax.com',
			},
			{
				protocol: 'https',
				hostname: 'st.ntcdntempv3.com',
			},
			{
				protocol: 'https',
				hostname: 'st.nettruyenio.com',
			},
		],
	},
};

module.exports = nextConfig;
