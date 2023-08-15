'use client';

import { useState } from 'react';

export interface ShowMoreTextProps {
	text: string;
}

export const ShowMoreText = (props: ShowMoreTextProps) => {
	const { text } = props;
	const [showMore, setShowMore] = useState(false);

	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	const renderText = () => {
		if (showMore) {
			return text;
		}
		return text.slice(0, 100);
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
