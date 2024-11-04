import { SpriteStates } from '../../../types.js';
export const AdventurerConfig = {
    [SpriteStates.ATTACK]: {
        start: 49,
        end: 52,
    },
    [SpriteStates.IDLE]: {
        start: 0,
        end: 4,
    },
    [SpriteStates.MOVE]: {
        start: 8,
        end: 14,
    },
    [SpriteStates.HURT]: {
        start: 59,
        end: 62,
    },
    [SpriteStates.DEATH]: {
        start: 64,
        end: 68,
    },
    xCenterOffset: -0.75,
    yCenterOffset: 0,
    totalFramesX: 14,
    totalFramesY: 11,
    loadSpriteFrom: './Assets/Characters/Adventurer/spritesmirror.png',
    sprite: null,
};
export const defaultAdventurerConfig = {
    maxSpeed: 1,
    attackRange: 20,
    maxHealth: 100,
    damage: 10,
    animationSpeed: 0.3,
    sizeMultiplier: 4,
};
