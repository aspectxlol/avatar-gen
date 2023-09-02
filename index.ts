import express from 'express'
import { animal, color } from './types';
import { getColorHex, getColorName } from './utils';
import { createCanvas, loadImage } from 'canvas'
import { buffer } from 'node:stream/consumers';
const app = express();

app.use(express.static('.'));

app.get('/team/:team', async (req, res) => {
  const teamName = req.params.team as string;
  const [TColor, TAnimal] = teamName.split(' ');

  // Check for invalid color and animal
  if (!Object.keys(color).map(color => color.toLowerCase()).includes(TColor.toLowerCase())) {
    return res.send('Invalid color');
  }
  if (!animal.map(animal => animal.toLowerCase()).includes(TAnimal.toLowerCase())) {
    return res.send('Invalid Animal');
  }

  const TACollor = getColorHex(TColor);

  const canvas = createCanvas(240, 240);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = TACollor!
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  await loadImage(`${__dirname}/avatars/${animal[animal.map(animal => animal.toLowerCase()).indexOf(TAnimal)!]}.png`)
    .then((image) => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    })
    .catch((error) => {
      console.error('Error loading image:', error);
      res.send('Error loading image');
    });

  const imageBuffer = canvas.toBuffer('image/png', { compressionLevel: 6 });
  res.set('Content-Type', 'image/png');
  res.set('Content-Disposition', `inline; filename=${getColorName(TColor)}_${animal[animal.map(animal => animal.toLowerCase()).indexOf(TAnimal)]}.png`);
  res.send(imageBuffer);
  // imageBuffer.pipe(res)

});

app.listen(8000 || process.env.PORT, () => {console.log('listening on port')})