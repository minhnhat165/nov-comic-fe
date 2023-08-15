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
		],
	},
};

module.exports = nextConfig;
