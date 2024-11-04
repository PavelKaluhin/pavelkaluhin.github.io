import { HERO_REGENERATION_RATE } from '../config.js';
import { RegenerationEffect } from '../Effects/Regeneration.js';
import { PossibleEffects, SpriteStates } from '../types.js';
import { hypotenuseСalculation } from '../utils.js';
import { Character } from './Character.js';
import { heroConfig } from './heroConfig.js';
const verticalSpeed = {
    KeyW: -1,
    KeyS: 1,
};
const horizontalSpeed = {
    KeyD: 1,
    KeyA: -1,
};
export class Hero extends Character {
    horizontalMoveDirection = 0;
    verticalMoveDirection = 0;
    constructor(sprite) {
        super(sprite, heroConfig);
        document.addEventListener('keydown', event => {
            if (event.repeat === false) {
                this.updateMoveDirection(event.code, true);
            }
            event.code === 'KeyK' &&
                this.updateState({
                    looped: false,
                    locked: true,
                    state: SpriteStates.ATTACK,
                }, null);
        });
        document.addEventListener('keyup', event => {
            if (event.code === 'KeyK') {
                this.sprite.onAnimationDone = () => {
                    this.stateLocked = false;
                };
            }
            this.updateMoveDirection(event.code, false);
        });
        this.addEffect(new RegenerationEffect(true, PossibleEffects.REGENERATION, Infinity, this.config.maxHealth * HERO_REGENERATION_RATE));
    }
    updateMoveDirection(keycode, keyIsDown) {
        // eslint-disable-next-line no-magic-numbers
        const speedMultiplier = keyIsDown ? -1 : 1;
        this.verticalMoveDirection -=
            keycode in verticalSpeed ? verticalSpeed[keycode] * speedMultiplier : 0;
        this.horizontalMoveDirection -=
            keycode in horizontalSpeed
                ? horizontalSpeed[keycode] * speedMultiplier
                : 0;
    }
    updateSpeedByMoveDirection() {
        if (!(this.horizontalMoveDirection || this.verticalMoveDirection) ||
            this.stateLocked) {
            return;
        }
        const denominator = hypotenuseСalculation(this.horizontalMoveDirection, this.verticalMoveDirection);
        super.updateSpeed(this.speedX +
            (this.config.maxSpeed * this.horizontalMoveDirection) / denominator, this.speedY +
            (this.config.maxSpeed * this.verticalMoveDirection) / denominator);
    }
}
