export class Sprite {
    image;
    startFrame = 0;
    endFrame = 0;
    frameWidth;
    frameHeight;
    frameProgress = 0;
    animationSpeed = 0;
    sizeMultiplier = 0;
    isMirrored = false;
    onAnimationDone;
    spriteConfig;
    constructor(spriteConfig) {
        this.image = spriteConfig.sprite;
        this.frameWidth = this.image.width / spriteConfig.totalFramesX;
        this.frameHeight = this.image.height / spriteConfig.totalFramesY;
        this.spriteConfig = spriteConfig;
    }
    update() {
        this.frameProgress += this.animationSpeed;
        const maxStateProgress = this.endFrame - this.startFrame;
        if (this.frameProgress >= maxStateProgress && this.onAnimationDone) {
            this.onAnimationDone();
            this.onAnimationDone = undefined;
        }
        this.frameProgress %= maxStateProgress;
    }
    setAnimation(state, onDone) {
        this.startFrame = this.spriteConfig[state].start;
        this.endFrame = this.spriteConfig[state].end;
        this.frameProgress = 0;
        this.onAnimationDone = onDone;
    }
    draw(_ctx, x, y) {
        const frameX = Math.floor(this.startFrame + this.frameProgress);
        const frameY = Math.floor((frameX * this.frameWidth) / (this.image.width / 2));
        const xCenterAdjuster = this.sizeMultiplier *
            (this.frameWidth / 2 - this.spriteConfig.xCenterOffset);
        const yCenterAdjuster = this.sizeMultiplier *
            (this.frameHeight / 2 - this.spriteConfig.yCenterOffset);
        const UnmirroredFrameX = (frameX * this.frameWidth) % (this.image.width / 2);
        const MirroredFrameX = this.image.width - this.frameWidth - UnmirroredFrameX;
        // razbit na 3-4 functii chtobi bilo ponyatno
        _ctx.drawImage(this.image, 1 + (this.isMirrored ? MirroredFrameX : UnmirroredFrameX), 1 + frameY * this.frameHeight, this.frameWidth, this.frameHeight, x - xCenterAdjuster, y - yCenterAdjuster, this.frameWidth * this.sizeMultiplier, this.frameHeight * this.sizeMultiplier);
    }
}
