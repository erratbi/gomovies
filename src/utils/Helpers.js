export const slugify = text =>
	text &&
	text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w-]+/g, '') // Remove all non-word chars
		.replace(/--+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text

export const scrollTo = (distance, duration) => {
	const initialY = window.scrollY;
	const y = initialY - (window.scrollY - distance);
	const baseY = (initialY + y) * 0.5;
	const difference = initialY - baseY;
	const startTime = performance.now();

	const step = () => {
		let normalizedTime = (performance.now() - startTime) / duration;
		if (normalizedTime > 1) normalizedTime = 1;

		window.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI));
		if (normalizedTime < 1) window.requestAnimationFrame(step);
	};
	window.requestAnimationFrame(step);
};
