"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorName = exports.getColorHex = void 0;
const types_1 = require("./types");
function getColorHex(colorName) {
    const lowercaseColorName = colorName.toLowerCase();
    for (let key in types_1.color) {
        if (key.toLowerCase() === lowercaseColorName) {
            return types_1.color[key]; // Use type assertion here
        }
    }
    return null; // Return null if the color name is not found
}
exports.getColorHex = getColorHex;
function getColorName(colorName) {
    const lowercaseColorName = colorName.toLowerCase();
    for (let key in types_1.color) {
        if (key.toLowerCase() === lowercaseColorName) {
            return key; // Use type assertion here
        }
    }
    return null;
}
exports.getColorName = getColorName;
