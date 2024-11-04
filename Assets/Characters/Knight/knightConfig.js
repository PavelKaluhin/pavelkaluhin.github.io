import { SpriteStates } from '../../../types.js';
export const KnightConfig = {
    [SpriteStates.ATTACK]: {
        start: 18,
        end: 24,
    },
    [SpriteStates.IDLE]: {
        start: 1,
        end: 10,
    },
    [SpriteStates.MOVE]: {
        start: 8,
        end: 18,
    },
    [SpriteStates.HURT]: {
        start: 45,
        end: 49,
    },
    [SpriteStates.DEATH]: {
        start: 48,
        end: 57,
    },
    xCenterOffset: 1,
    yCenterOffset: 0,
    totalFramesX: 20,
    totalFramesY: 9,
    loadSpriteFrom: './Assets/Characters/Knight/spritesmirror.png',
    sprite: null,
};
export const defaultKnightsConfig = {
    maxSpeed: 0.4,
    attackRange: 35,
    maxHealth: 120,
    damage: 15,
    animationSpeed: 0.2,
    sizeMultiplier: 2,
};
