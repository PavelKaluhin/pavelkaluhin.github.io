export class CircularArea {
    effect;
    x;
    y;
    distance;
    constructor(effect, x, y, distance) {
        this.effect = effect;
        this.x = x;
        this.y = y;
        this.distance = distance;
    }
}
export class RectangularArea {
    effect;
    x;
    y;
    width;
    height;
    constructor(effect, x, y, width, height) {
        this.effect = effect;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
export class ConstantRayArea {
    effect;
    x;
    y;
    angle;
    width;
    constructor(effect, x, y, angle, width) {
        this.effect = effect;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.width = width;
    }
}
export class ExpandingRayArea {
    effect;
    x;
    y;
    angle1;
    angle2;
    constructor(effect, x, y, angle1, angle2) {
        this.effect = effect;
        this.x = x;
        this.y = y;
        this.angle1 = angle1;
        this.angle2 = angle2;
    }
}
