export const convertPosition = (position, radius) => {
	// x,y,z 의 위치값
	const x = Math.cos(position.lat) * Math.sin(position.lng) * radius;
	const y = Math.sin(position.lat) * radius;
	const z = Math.cos(position.lat) * Math.cos(position.lng) * radius;

	return { x, y, z };
};

export function getGradientCanvas(startColor, endColor) {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	canvas.width = 256;
	canvas.height = 1;

	const gradient = context.createLinearGradient(0, 0, 256, 0);
	gradient.addColorStop(0, startColor);
	gradient.addColorStop(1, endColor);

	context.fillStyle = gradient;
	context.fillRect(0, 0, 256, 1);

	return canvas;
}
