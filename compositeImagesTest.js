const sharp = require("sharp");

async function compositeImages() {
  try {
    // Convert sammy-transparent.png to grayscale
    const sammy = await sharp("sammy-transparent.png")
      .toColourspace('b-w')
      .toBuffer();

    await sharp(sammy).toFile("images/sammy-grayscale.png");

    // Get the metadata of sammy image to create a new image of the same size
    const { width, height } = await sharp(sammy).metadata();

    // Extract the alpha channel from the original image
    // It will be used as a mask for the colored image
    const alpha = await sharp(sammy).extractChannel(3).toBuffer();

    await sharp(alpha).toFile("images/mask.png");

    // Create a new image filled with the color #6f5240 and alpha 0
    const colorImage = await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 70, g: 250, b: 250, alpha: 1 },
      },
    }).png().toBuffer();

    // Composite the color image with sammy using the multiply blend mode
    let coloredSammy = await sharp(sammy)
      .composite([{ input: colorImage, blend: 'multiply' }])
      .toBuffer();

    await sharp(coloredSammy).toFile("images/coloredSammy.png");

    // Remove the original transparent pixels. Workaround from https://github.com/lovell/sharp/issues/1820
    const newColored = await sharp(coloredSammy)
      .removeAlpha()
      .toBuffer();

    // Apply the mask to the colored image
    const maskedImage = await sharp(newColored)
      .joinChannel(alpha)
      .toBuffer();

    await sharp(maskedImage).toFile("images/coloredSammyWithAlpha.png");

    await sharp("underwater.png")
      .composite([
        {
          input: maskedImage,
          top: 50,
          left: 50,
        },
      ])
      .toFile("images/sammy-underwater.png");
  } catch (error) {
    console.log(error);
  }
}

compositeImages();