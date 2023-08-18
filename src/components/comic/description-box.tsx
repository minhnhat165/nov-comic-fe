'use client';

import { useState } from 'react';

export interface DescriptionBoxProps {
	data: string;
}

export const DescriptionBox = ({ data }: DescriptionBoxProps) => {
	const [showMore, setShowMore] = useState(false);

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	const renderText = () => {
		if (showMore) {
			return data;
		}
		return data.slice(0, 100);
	};

	return (
		<div>
			<p>
				{renderText()}{' '}
				{!showMore && (
					<button onClick={toggleShowMore} className="text-primary">
						...show more
					</button>
				)}
			</p>
			{showMore && (
				<button onClick={toggleShowMore} className="text-primary">
					show less
				</button>
			)}
		</div>
	);
};
