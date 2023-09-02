"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const types_1 = require("./types");
const utils_1 = require("./utils");
const canvas_1 = require("canvas");
const app = (0, express_1.default)();
app.use(express_1.default.static('.'));
app.get('/team/:team', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teamName = req.params.team;
    const [TColor, TAnimal] = teamName.split(' ');
    // Check for invalid color and animal
    if (!Object.keys(types_1.color).map(color => color.toLowerCase()).includes(TColor.toLowerCase())) {
        return res.send('Invalid color');
    }
    if (!types_1.animal.map(animal => animal.toLowerCase()).includes(TAnimal.toLowerCase())) {
        return res.send('Invalid Animal');
    }
    const TACollor = (0, utils_1.getColorHex)(TColor);
    const canvas = (0, canvas_1.createCanvas)(240, 240);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = TACollor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    yield (0, canvas_1.loadImage)(`${__dirname}/avatars/${types_1.animal[types_1.animal.map(animal => animal.toLowerCase()).indexOf(TAnimal)]}.png`)
        .then((image) => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    })
        .catch((error) => {
        console.error('Error loading image:', error);
        res.send('Error loading image');
    });
    const imageBuffer = canvas.toBuffer('image/png', { compressionLevel: 6 });
    res.set('Content-Type', 'image/png');
    res.set('Content-Disposition', `inline; filename=${(0, utils_1.getColorName)(TColor)}_${types_1.animal[types_1.animal.map(animal => animal.toLowerCase()).indexOf(TAnimal)]}.png`);
    res.send(imageBuffer);
    // imageBuffer.pipe(res)
}));
app.listen(8000 || process.env.PORT, () => { console.log('listening on port'); });
