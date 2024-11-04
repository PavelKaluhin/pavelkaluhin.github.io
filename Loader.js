import { AdventurerConfig } from './Enemies/adventurerConfig.js';
import { KnightConfig } from './Enemies/knightConfig.js';
import { SpritesConfigsOrder, } from './types.js';
const floorTileImageSrc = './Assets/Grass/mygrass2.png';
const rawSpriteSchema = {
    [SpritesConfigsOrder.ADVENTURER]: AdventurerConfig,
    [SpritesConfigsOrder.KNIGHT]: KnightConfig,
};
export class Loader {
    loadedAssets;
    async loadAssets() {
        const sprites = {};
        const spritesSchemaDecomposed = Object.entries(rawSpriteSchema);
        for (const [spriteOrder, spriteRawConfig] of spritesSchemaDecomposed) {
            const loadedImage = await this.loadImage(spriteRawConfig.loadSpriteFrom);
            sprites[spriteOrder] = {
                ...spriteRawConfig,
                sprite: loadedImage,
            };
        }
        this.loadedAssets = {
            floor: await this.loadImage(floorTileImageSrc),
            sprites: sprites,
        };
        return this.loadedAssets;
    }
    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
            img.src = src;
        });
    }
}
