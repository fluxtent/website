const sharp = require('sharp');
const path = require('path');

const input = path.join(__dirname, 'images', 'logo.png');
const output = path.join(__dirname, 'images', 'logo_fixed.png');

sharp(input)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(output)
    .then(() => console.log('Done: cropped logo saved as logo_fixed.png'))
    .catch(err => console.error(err));
