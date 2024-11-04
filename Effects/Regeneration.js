import { PossibleEffects } from '../types.js';
import { BaseEffect } from './BaseEffect.js';
export class RegenerationEffect extends BaseEffect {
    constructor(silent, type, framesLeft, heal) {
        super(silent, PossibleEffects.REGENERATION, framesLeft, character => {
            character.currentHealth = Math.min(character.currentHealth + heal, character.config.maxHealth);
        });
    }
}
