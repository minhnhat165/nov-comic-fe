import { NextRequest, NextResponse } from 'next/server';
import { UALength, userAgents } from '@/configs/user-agent';

import { CRAWLER_API_URL } from '@/configs';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	let imageLink = searchParams.get('data') as string;

	try {
		const referer = `https://${CRAWLER_API_URL}`;
		const userAgent = userAgents[Math.floor(Math.random() * UALength)];
		const res = await fetch(imageLink, {
			headers: {
				referer: referer,
				'User-Agent': userAgent,
			},
		});
		const blob = await res.blob();
		return new Response(blob, {
			headers: {
				'Content-Type': 'image/jpeg',
			},
		});
	} catch (_error) {
		const error = _error as Error;
		return NextResponse.next({
			status: 500,
			statusText: error.message,
		});
	}
}
