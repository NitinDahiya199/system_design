import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "app", "icon.svg"));
const png32 = await sharp(svg).resize(32, 32).png().toBuffer();
const png16 = await sharp(svg).resize(16, 16).png().toBuffer();
const ico = await pngToIco([png16, png32]);
const dir = join(root, "public");
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "favicon.ico"), ico);
console.log("Wrote public/favicon.ico", ico.length, "bytes");
