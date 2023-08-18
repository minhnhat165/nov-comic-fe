'use client';

import 'keen-slider/keen-slider.min.css';

import { Comic } from '@/types/comic';
import { ComicCard } from '@/components/comic/comic-card';
import { useKeenSlider } from 'keen-slider/react';

export interface RecommendSlideProps {
	data: Comic[];
}

export const RecommendSlide = (props: RecommendSlideProps) => {
	const [sliderRef] = useKeenSlider<HTMLDivElement>(
		{
			loop: true,
			slides: {
				perView: 2,
				spacing: 5,
			},
		},
		[
			(slider) => {
				let timeout: ReturnType<typeof setTimeout>;
				let mouseOver = false;
				function clearNextTimeout() {
					clearTimeout(timeout);
				}
				function nextTimeout() {
					clearTimeout(timeout);
					if (mouseOver) return;
					timeout = setTimeout(() => {
						slider.next();
					}, 2000);
				}
				slider.on('created', () => {
					slider.container.addEventListener('mouseover', () => {
						mouseOver = true;
						clearNextTimeout();
					});
					slider.container.addEventListener('mouseout', () => {
						mouseOver = false;
						nextTimeout();
					});
					nextTimeout();
				});
				slider.on('dragStarted', clearNextTimeout);
				slider.on('animationEnded', nextTimeout);
				slider.on('updated', nextTimeout);
			},
		],
	);
	return (
		<div ref={sliderRef} className="keen-slider">
			{props.data.map((comic) => (
				<div key={comic.id} className="keen-slider__slide">
					<ComicCard variant="recommend" data={comic} />
				</div>
			))}
		</div>
	);
};
