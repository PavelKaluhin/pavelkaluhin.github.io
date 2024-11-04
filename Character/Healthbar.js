import { HEALTHBAR_BORDER_WIDTH, HEALTHBAR_HEIGHT } from '../config.js';
export class Healthbar {
    static draw(_ctx, x, y, progress, width, height = HEALTHBAR_HEIGHT, borders = HEALTHBAR_BORDER_WIDTH) {
        _ctx.fillStyle = 'black';
        _ctx.fillRect(x - width / 2 - borders / 2, y - borders / 2, width + borders, height + borders);
        _ctx.fillStyle = 'red';
        _ctx.fillRect(x - width / 2, y, progress * width, height);
    }
}
