module Inknote.Maths {

    export class Vector2 {
        constructor(public x: number, public y: number) {

        }

        get abs() {
            return pythagoras(this.x, this.y);
        }
    }

} 