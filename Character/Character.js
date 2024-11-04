import { DECELERATION_THRESHOLD, GLOBAL_SPEED_MULTIPLIER } from '../config.js';
import { enemySpawner } from '../index.js';
import { SpriteStates, } from '../types.js';
import { delay, hypotenuseСalculation } from '../utils.js';
import { Healthbar } from './Healthbar.js';
const canvas = document.querySelector('canvas');
export class Character {
    sprite;
    config;
    effects = [];
    _locationX = 0;
    _locationY = 0;
    _speedX = 0;
    _speedY = 0;
    _state;
    stateLooped;
    _isInvincible;
    currentEffects = [];
    _damage;
    currentHealth;
    stateLocked;
    get isInvincible() {
        return this._isInvincible;
    }
    get damage() {
        return this._damage;
    }
    get state() {
        return this._state;
    }
    get speedX() {
        return this._speedX;
    }
    get speedY() {
        return this._speedY;
    }
    get locationX() {
        return this._locationX;
    }
    get locationY() {
        return this._locationY;
    }
    constructor(sprite, config) {
        this.sprite = sprite;
        this.sprite.animationSpeed = config.animationSpeed;
        this.sprite.sizeMultiplier = config.sizeMultiplier;
        this.config = config;
        this.currentHealth = config.maxHealth;
        this._damage = config.damage;
    }
    draw(_ctx, offsetX, offsetY, heroX, heroY) {
        this.sprite.draw(_ctx, offsetX, //+ this.locationX,
        offsetY);
        Healthbar.draw(_ctx, canvas.width / 2 - heroX + this.locationX, canvas.height / 2 -
            heroY +
            this.locationY -
            (this.sprite.frameHeight / 2) * this.sprite.sizeMultiplier, this.currentHealth / this.config.maxHealth, this.config.maxHealth);
    }
    updateSpeed(speedX = this.speedX, speedY = this.speedY) {
        this._speedX = speedX;
        this._speedY = speedY;
    }
    updateLocation(locationX = this._locationX + this.speedX * GLOBAL_SPEED_MULTIPLIER, locationY = this._locationY + this.speedY * GLOBAL_SPEED_MULTIPLIER) {
        this._locationX = locationX;
        this._locationY = locationY;
        return { locationX: this._locationX, locationY: this._locationY };
    }
    updateState(newState, onStateDone = () => (this.stateLocked = false)) {
        if (this.stateLocked) {
            return;
        }
        this._state = newState.state;
        this.stateLocked = newState.locked;
        this.stateLooped = newState.looped;
        this.sprite.frameProgress = 0;
        if (this.sprite.spriteConfig[newState.state]) {
            this.sprite.setAnimation(this._state, onStateDone);
        }
    }
    updateAnimationState() {
        if (this.speedX > 0) {
            this.sprite.isMirrored = false;
        }
        if (this.speedX < 0) {
            this.sprite.isMirrored = true;
        }
        if (this.stateLocked) {
            return;
        }
        if (this.speedX || this.speedY) {
            if (this._state !== 'move') {
                this.updateState({
                    locked: false,
                    looped: false,
                    state: SpriteStates.MOVE,
                });
            }
            return;
        }
        if (this._state !== 'idle') {
            this.updateState({
                locked: false,
                looped: false,
                state: SpriteStates.IDLE,
            });
        }
    }
    startAttack() {
        this.updateState({
            looped: false,
            locked: true,
            state: SpriteStates.ATTACK,
        }, null);
        this.sprite.onAnimationDone = () => {
            this.stateLocked = false;
        };
    }
    async takeDamage(damage, invulnerabilityTime) {
        this.currentHealth = Math.max(this.currentHealth - damage, 0);
        if (this.currentHealth > 0) {
            this.updateState({
                looped: false,
                locked: true,
                state: SpriteStates.HURT,
            }, null);
            this._isInvincible = true;
            this.sprite.onAnimationDone = () => {
                this.stateLocked = false;
            };
            await delay(invulnerabilityTime);
            this._isInvincible = false;
        }
    }
    checkDeathStatus() {
        if (this.currentHealth <= 0) {
            this.updateState({
                looped: false,
                locked: true,
                state: SpriteStates.DEATH,
            }, null);
            this.sprite.onAnimationDone = () => {
                enemySpawner.charactersActive.splice(enemySpawner.charactersActive.indexOf(this), 
                // eslint-disable-next-line no-magic-numbers
                1);
            };
        }
    }
    applyEffects() {
        this.effects.map(el => {
            el.apply(this);
        });
        this.effects = this.effects.filter(el => el.framesLeft > 0);
    }
    push(deltaX, deltaY, strength, changeSpeed = true) {
        const angle = Math.atan(deltaY / deltaX);
        if (changeSpeed) {
            this.updateSpeed(this.speedX +
                strength * (deltaX > 0 ? Math.cos(angle) : -Math.cos(angle)), this.speedY +
                strength * (deltaX > 0 ? Math.sin(angle) : -Math.sin(angle)));
        }
        else {
            this.updateLocation(this.locationX +
                strength * (deltaX > 0 ? Math.cos(angle) : -Math.cos(angle)), this.locationY +
                strength * (deltaX > 0 ? Math.sin(angle) : -Math.sin(angle)));
        }
    }
    decelerate() {
        const totalSpeed = hypotenuseСalculation(this._speedX, this._speedY);
        if (totalSpeed <= DECELERATION_THRESHOLD) {
            this.updateSpeed(0, 0);
            return;
        }
        const decelerationRatio = (totalSpeed - DECELERATION_THRESHOLD) / totalSpeed;
        this.updateSpeed(this._speedX * decelerationRatio, this._speedY * decelerationRatio);
    }
    updateStatePipeline() {
        this.decelerate();
        this.checkDeathStatus();
        this.applyEffects();
    }
    addEffect(effect) {
        this.effects.push(effect);
    }
}
