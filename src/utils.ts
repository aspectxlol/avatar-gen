import { color } from "./types";

export function getColorHex(colorName: string): string | null {
  const lowercaseColorName = colorName.toLowerCase();
  for (let key in color) {
    if (key.toLowerCase() === lowercaseColorName) {
      return color[key as keyof typeof color]; // Use type assertion here
    }
  }
  return null; // Return null if the color name is not found
}

export function getColorName(colorName: string): string | null {
  const lowercaseColorName = colorName.toLowerCase();
  for (let key in color) {
    if (key.toLowerCase() === lowercaseColorName) {
      return key; // Use type assertion here
    }
  }
  return null;
}