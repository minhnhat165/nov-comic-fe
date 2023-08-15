'use client';

import { useKeenSlider } from 'keen-slider/react';

export interface SlideProps {}

export const Slide = (props: SlideProps) => {
	const [sliderRef] = useKeenSlider<HTMLDivElement>(
		{
			loop: true,
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
		<div>
			<div ref={sliderRef} className="keen-slider">
				<div className="keen-slider__slide number-slide1">1</div>
				<div className="keen-slider__slide number-slide2">2</div>
				<div className="keen-slider__slide number-slide3">3</div>
				<div className="keen-slider__slide number-slide4">4</div>
				<div className="keen-slider__slide number-slide5">5</div>
				<div className="keen-slider__slide number-slide6">6</div>
			</div>
		</div>
	);
};
