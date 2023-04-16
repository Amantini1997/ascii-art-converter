const contextToRGBMatrix = (context, width, height) => {
    const imageData = context.getImageData(0, 0, width, height);

    const RGBMatrix = [];

    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];

        RGBMatrix.push([r, g, b]);
    }
	
	return RGBMatrix;
};

const imgSrcToRGBMatrix = (src) => {
	const image = new Image();

	image.onload = () => {
		const [width, height] = clampDimensions(image.width, image.height);

		canvas.width = width;
		canvas.height = height;

		context.drawImage(image, 0, 0, width, height);
		const grayScales = convertToGrayScales(context, width, height);

		drawAscii(grayScales, width);
	}

	image.src = src;
	return image;
}