import { DrawManager } from './drawManager.js';
import { EnemySpawner } from './Enemies/EnemySpawner.js';
import { Loader } from './Loader.js';
const loader = new Loader();
export let loadedAssets;
export let enemySpawner;
const init = async () => {
    loadedAssets = await loader.loadAssets();
    enemySpawner = new EnemySpawner();
    DrawManager.drawFloor();
    DrawManager.animate();
};
init();
//document.querySelector('button').addEventListener('click', EnemySpawner.spawn)
document
    .querySelector('button')
    .addEventListener('click', () => enemySpawner.spawnEnemy(enemySpawner.getRandomEnemy()));
