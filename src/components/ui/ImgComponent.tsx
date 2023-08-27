'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

interface ImageComponentProps {
	imageUrl: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ imageUrl }) => {
	const [base64ImageData, setBase64ImageData] = useState<string | null>(null);

	useEffect(() => {
		const fetchAndConvertToBase64 = async () => {
			try {
				const response = await fetch(imageUrl);
				const blob = await response.blob();

				const reader = new FileReader();
				reader.onload = () => {
					if (typeof reader.result === 'string') {
						setBase64ImageData(reader.result);
					}
				};
				reader.readAsDataURL(blob);
			} catch (error) {
				console.error('Error fetching image:', error);
			}
		};

		fetchAndConvertToBase64();
	}, [imageUrl]);

	return (
		<div>
			{base64ImageData && (
				<Image
					width={200}
					height={200}
					src={base64ImageData}
					alt="Fetched and Base64 Image"
				/>
			)}
		</div>
	);
};

export default ImageComponent;
