'use client';

import React, { useEffect, useState } from 'react';

export const TopProgressBar: React.FC = () => {
	const [progress, setProgress] = useState<number>(0);

	useEffect(() => {
		const progressInterval = setInterval(() => {
			// Simulate progress increment
			if (progress < 100) {
				setProgress(progress + 15); // Adjust increment value as needed
			}
		}, 500); // Adjust interval as needed

		return () => clearInterval(progressInterval);
	}, [progress]);

	return (
		<div
			className="top-progress-bar h-1 fixed top-0 left-0 z-20 transition-width duration-300 ease-in-out bg-primary"
			style={{ width: `${progress}%` }}
		/>
	);
};
