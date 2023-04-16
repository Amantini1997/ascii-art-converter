const GRAY_RAMP = '@$0O>+¬-· ';

const getCharacterForGrayScale = (grayScale) => GRAY_RAMP[Math.ceil((GRAY_RAMP.length - 1) * grayScale / 255)];

const drawAscii = (grayScales, width) => {
    const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
        let nextChars = getCharacterForGrayScale(grayScale);
        if ((index + 1) % width === 0) {
            nextChars += '\n';
        }

        return asciiImage + nextChars;
    }, '');

    asciiImage.textContent = ascii;
};

const normaliseGrayScaleValues = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b;

const convertToGrayScales = (context, width, height) => {
    const imageData = context.getImageData(0, 0, width, height);
    const rgbMatrix = contextToRGBMatrix(context, width, height);

	const grayScales = []

	rgbMatrix.forEach((pixel, index) => {
        const grayScale = normaliseGrayScaleValues(...pixel);
		const imageDataIndex = index * 4
        imageData.data[imageDataIndex] = imageData.data[imageDataIndex + 1] = imageData.data[imageDataIndex + 2] = grayScale;
		grayScales.push(grayScale);
	})

    context.putImageData(imageData, 0, 0);

    return grayScales;
};
