import './globals.css';

import type { Metadata } from 'next';
import { Providers } from '@/providers';
import { TopNav } from '@/components/layout';
import { poppinsVN } from '@/app/styles/fonts';

export const metadata: Metadata = {
	title: 'Nov Comics',
	description: 'Read comics online for free.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={poppinsVN.className}>
				<Providers>
					<TopNav />
					<div className="pt-14 px-2">{children}</div>
				</Providers>
			</body>
		</html>
	);
}
