import { defaultAdventurerConfig } from './adventurerConfig.js';
import { defaultKnightsConfig } from './knightConfig.js';
import { Character } from '../Character/Character.js';
import { Hero } from '../Character/Hero.js';
import { Sprite } from '../Character/Sprite.js';
import { loadedAssets } from '../index.js';
import { SpritesConfigsOrder } from '../types.js';
const CharacterLogicalConfigs = [defaultAdventurerConfig, defaultKnightsConfig];
let queuedEnemies = [];
export class EnemySpawner {
    charactersActive;
    queuedEnemies = [];
    constructor() {
        this.charactersActive = [
            new Hero(new Sprite(loadedAssets.sprites[SpritesConfigsOrder.ADVENTURER])),
        ];
    }
    spawnQueuedEnemies() {
        this.charactersActive = [...this.charactersActive, ...queuedEnemies];
        queuedEnemies = [];
    }
    spawnEnemy(enemy) {
        this.charactersActive.push(enemy);
    }
    queueEnemy(enemy) {
        this.queuedEnemies.push(enemy);
    }
    getRandomEnemy() {
        const randomNumber = Math.floor(Math.random() * Object.keys(loadedAssets.sprites).length);
        const randomEnemy = new Character(new Sprite(loadedAssets.sprites[randomNumber]), CharacterLogicalConfigs[randomNumber]);
        // eslint-disable-next-line no-magic-numbers
        randomEnemy.updateLocation(Math.random() * 1000, Math.random() * 1000);
        return randomEnemy;
    }
}
