module Inknote.Maths{
 
    export class Vector2 {
    constructor(public x, public y) {

    }

    get abs() {
        return pythagoras(this.x, this.y);
    }
}   
    
} 