module Inknote.Drawing {

    export class ChordSymbol extends Notation {

        standardChord: ChordNotation.StandardChordNotation;

        draw(ctx: CanvasRenderingContext2D) {

            // displays chord in correct manner.
            var theChord = this.standardChord;
            var displayChord = getCurrentChordNotation(theChord.baseNote, theChord.rootNote, theChord.minor, theChord.annotations);

            var text = displayChord.name;

            ctx.beginPath();
            ctx.fillStyle = Colours.black;
            ctx.strokeStyle = Colours.black;
            ctx.textAlign = "center";

            ctx.fillText(text, this.x, this.y);

            return true;
        }
    }

} 