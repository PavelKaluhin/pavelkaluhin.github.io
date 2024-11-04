/* eslint-disable no-magic-numbers */
import { Hero } from './Character/Hero.js';
import { enemySpawner, loadedAssets } from './index.js';
import { InteractionManager } from './InteractionManager.js';
const MAP_SIZE = {
    width: 1600,
    height: 1600,
};
//config
const floorTileParams = {
    width: 32,
    height: 32,
};
const compatibleTiles = [
    { x: 0, y: 0, chance: 0.4 },
    { x: 4, y: 0, chance: 0.4 },
    { x: 0, y: 1, chance: 0.5 },
    { x: 1, y: 1, chance: 0.5 },
    { x: 2, y: 1, chance: 0.5 },
    { x: 3, y: 1, chance: 0.5 },
    { x: 4, y: 1, chance: 0.5 },
    { x: 0, y: 2, chance: 0.5 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
    { x: 0, y: 3, chance: 0.05 },
    { x: 1, y: 3, chance: 0.15 },
    { x: 2, y: 3, chance: 0.3 },
    { x: 3, y: 3 },
    { x: 4, y: 3 },
];
const canvas = document.querySelector('canvas');
canvas.width = 1200;
canvas.height = 600;
const ctx = canvas.getContext('2d');
const offscreenCanvas = new OffscreenCanvas(MAP_SIZE.width, MAP_SIZE.height);
const octx = offscreenCanvas.getContext('2d');
export class DrawManager {
    static animate() {
        let heroX = enemySpawner.charactersActive[0].locationX;
        let heroY = enemySpawner.charactersActive[0].locationY;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(offscreenCanvas, -heroX, -heroY);
        enemySpawner.charactersActive.forEach((el, index) => {
            el.updateAnimationState();
            const { locationX, locationY } = el.updateLocation();
            if (index === 0) {
                heroX = locationX;
                heroY = locationY;
            }
            el.sprite.update();
            el.draw(ctx, el instanceof Hero
                ? canvas.width / 2
                : -heroX + canvas.width / 2 + el.locationX, el instanceof Hero
                ? canvas.height / 2
                : -heroY + canvas.height / 2 + el.locationY, heroX, heroY);
            this.drawHitbox(50, -heroX + canvas.width / 2 + el.locationX, -heroY + canvas.height / 2 + el.locationY);
        });
        InteractionManager.updateInteractions();
        // setTimeout(() => DrawManager.animate(), 300);
        requestAnimationFrame(() => DrawManager.animate());
    }
    static drawHitbox(size = 100, x = canvas.width / 2, y = canvas.height / 2) {
        ctx.beginPath();
        ctx.rect(x - size / 2, y - size / 2, size, size);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.closePath();
    }
    static drawFloor() {
        let colsX = MAP_SIZE.width / floorTileParams.width + 2;
        let colsY = MAP_SIZE.height / floorTileParams.height + 2;
        let x = 0;
        for (let y = 0;; x++) {
            const tile = this.getRandomTile();
            if (x > colsX) {
                x = 0;
                y += 1;
            }
            if (y > colsY) {
                break;
            }
            octx.drawImage(loadedAssets.floor, tile.x * floorTileParams.width, tile.y * floorTileParams.height, floorTileParams.width, floorTileParams.height, x * floorTileParams.width, y * floorTileParams.height, floorTileParams.width, floorTileParams.height);
        }
    }
    static getRandomTile() {
        while (true) {
            const randomNumber = Math.trunc(Math.random() * compatibleTiles.length);
            const tile = compatibleTiles[randomNumber];
            if (!tile.chance) {
                return tile;
            }
            const tileAcceptedChance = Math.random();
            if (tileAcceptedChance < tile.chance) {
                return tile;
            }
        }
    }
}
