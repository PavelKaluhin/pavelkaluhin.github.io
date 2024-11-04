import { SpriteStates } from '../../../types.js';
//@ts-expect-error
export const SwordsmanConfig = {
    [SpriteStates.ATTACK]: {
        start: 35,
        end: 42,
    },
    [SpriteStates.MOVE]: {
        start: 11,
        end: 20,
    },
    [SpriteStates.IDLE]: {
        start: 1,
        end: 10,
    },
};
