export class Effect {
    silent;
    type;
    framesLeft;
    apply;
    constructor(silent, type, framesLeft, apply) {
        this.silent = silent;
        this.type = type;
        this.framesLeft = framesLeft;
        this.apply = apply;
    }
    calculate(character) {
        if (this.framesLeft <= 0) {
            return;
        }
        this.apply(character);
        this.framesLeft -= 1;
    }
}
