import { Hero } from './Character/Hero.js';
import { ENEMY_INVULNERABILITY_TIME, HERO_INVULNERABILITY_TIME, } from './config.js';
import { enemySpawner } from './index.js';
import { hypotenuseСalculation } from './utils.js';
function unsquashAllCharacters(characters, el) {
    const nearestNeighbour = characters.reduce((acc, neighbour) => {
        if (el === neighbour) {
            return acc;
        }
        const distance = hypotenuseСalculation(el.locationX - neighbour.locationX, el.locationY - neighbour.locationY);
        if (distance < acc.distance) {
            acc.character = neighbour;
            acc.distance = distance;
        }
        return acc;
    }, { character: characters[0], distance: Infinity });
    const currentCharacterArea = (el.sprite.frameHeight + el.sprite.frameWidth) * el.sprite.sizeMultiplier;
    const nearestNeighbourCharacterArea = (nearestNeighbour.character.sprite.frameHeight +
        nearestNeighbour.character.sprite.frameWidth) *
        nearestNeighbour.character.sprite.sizeMultiplier;
    if (nearestNeighbour.distance <
        (currentCharacterArea + nearestNeighbourCharacterArea) / 10 //- ?
    ) {
        const deltaX = nearestNeighbour.character.locationX - el.locationX;
        const deltaY = nearestNeighbour.character.locationY - el.locationY;
        el.push(deltaX, deltaY, -3, false);
        nearestNeighbour.character.push(deltaX, deltaY, 3, false);
    }
}
export class InteractionManager {
    static updateInteractions() {
        const hero = enemySpawner.charactersActive[0];
        const heroX = hero.locationX;
        const heroY = hero.locationY;
        enemySpawner.charactersActive.forEach(el => {
            el.updateStatePipeline();
            unsquashAllCharacters(enemySpawner.charactersActive, el);
            if (el instanceof Hero) {
                el.updateSpeedByMoveDirection();
                return;
            }
            const deltaX = heroX - el.locationX;
            const deltaY = heroY - el.locationY;
            const angle = Math.atan(deltaY / deltaX);
            if (!el.stateLocked) {
                el.updateSpeed(el.config.maxSpeed *
                    (deltaX > 0 ? Math.cos(angle) : -Math.cos(angle)), el.config.maxSpeed *
                    (deltaX > 0 ? Math.sin(angle) : -Math.sin(angle)));
            }
            this.checkHeroAttackInteraction(hero, el, deltaX, deltaY);
            this.checkEnemyAttackInteraction(hero, el, deltaX, deltaY);
        });
    }
    static checkHeroAttackInteraction(hero, enemy, deltaX, deltaY) {
        const isInXAttackRange = Math.abs(deltaX / hero.config.attackRange / hero.sprite.sizeMultiplier) <=
            1;
        const IsDirectedTowards = !hero.sprite.isMirrored ? deltaX < 0 : deltaX > 0;
        const isInAbsYAttackRange = Math.abs(deltaY) <=
            hero.config.attackRange * 0.85 * hero.sprite.sizeMultiplier;
        const inHeroAttackRange = isInXAttackRange && IsDirectedTowards && isInAbsYAttackRange;
        if (inHeroAttackRange && hero.state === 'attack' && !enemy.isInvincible) {
            enemy.push(-deltaX, -deltaY, 8);
            enemy.takeDamage(hero.damage, ENEMY_INVULNERABILITY_TIME);
        }
    }
    static checkEnemyAttackInteraction(hero, enemy, deltaX, deltaY) {
        if (hypotenuseСalculation(deltaX, deltaY) <
            enemy.config.attackRange * enemy.sprite.sizeMultiplier &&
            enemy.state !== 'death') {
            enemy.startAttack();
            if (hero.isInvincible) {
                return;
            }
            hero.push(deltaX, deltaY, 8);
            hero.takeDamage(hero.damage, HERO_INVULNERABILITY_TIME);
        }
    }
}
