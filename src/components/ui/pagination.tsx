import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export interface PaginationProps {
	activePage: number;
	count: number;
	siblingCount?: number;
}

export const Pagination = ({
	activePage,
	count,
	siblingCount = 1,
}: PaginationProps) => {
	let startRange =
		activePage - siblingCount > 0 ? activePage - siblingCount : 1;
	if (activePage === count) {
		startRange = activePage - 2;
	}

	const displayPages = Array.from(
		{
			length: 1 + siblingCount * 2,
		},
		(_, i) => startRange + i,
	);

	const hasFirstPage = displayPages[0] === 1;

	if (hasFirstPage) {
		displayPages.push(displayPages[displayPages.length - 1] + 1);
	}

	const hasLastPage = displayPages[displayPages.length - 1] === count;

	if (hasLastPage) {
		displayPages.unshift(displayPages[0] - 1);
	}

	return (
		<div className="flex justify-between">
			<Button
				size="sm"
				disabled={activePage === 1}
				variant="ghost"
				className="uppercase"
			>
				<Link href={`/?page=${activePage - 1}`}>
					<ArrowLeftIcon strokeWidth={2} className="h-4 w-4 " />{' '}
					<span className="hidden sm:inline"></span>
				</Link>
			</Button>
			<div className="flex justify-evenly flex-1">
				{!hasFirstPage && (
					<>
						<Button
							className="aspect-square"
							size="sm"
							variant={1 === activePage ? 'default' : 'outline'}
						>
							<Link href={`/?page=${1}`}>{1}</Link>
						</Button>
						{displayPages[0] !== 2 && <span>...</span>}
					</>
				)}
				{displayPages.map((page) => (
					<Button
						className="min-w-[2.5rem] "
						size="sm"
						key={page}
						variant={page === activePage ? 'default' : 'outline'}
					>
						<Link href={`/?page=${page}`}>{page}</Link>
					</Button>
				))}

				{!hasLastPage && (
					<>
						...
						<Button
							size="sm"
							variant={
								count === activePage ? 'default' : 'outline'
							}
						>
							<Link href={`/?page=${count}`}>{count}</Link>
						</Button>
					</>
				)}
			</div>
			<Button variant="ghost" className="uppercase">
				<Link href={`/?page=${activePage + 1}`}>
					<span className="hidden sm:inline">Next</span>
					<ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
				</Link>
			</Button>
		</div>
	);
};
