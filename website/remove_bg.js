const sharp = require('sharp');
const path = require('path');

const input = path.join(__dirname, 'images', 'logo.png');
const output = path.join(__dirname, 'images', 'logo.png');

sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height, channels } = info;
    const threshold = 240;
    for (let i = 0; i < width * height; i++) {
      const r = data[i * channels];
      const g = data[i * channels + 1];
      const b = data[i * channels + 2];
      if (r >= threshold && g >= threshold && b >= threshold) {
        data[i * channels + 3] = 0;
      }
    }
    return sharp(Buffer.from(data), { raw: { width, height, channels } })
      .png()
      .toFile(output);
  })
  .then(() => console.log('Done: white background removed from logo.png'))
  .catch(err => console.error(err));
