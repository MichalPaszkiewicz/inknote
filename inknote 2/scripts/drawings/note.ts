module Inknote.Drawing {

    function drawNote(ctx: CanvasRenderingContext2D, x: number, y: number, note: Drawing.Note, lineHeight: number) {
        
        ctx.fillStyle = Colours.black;
        ctx.strokeStyle = Colours.black;

        if (note.isPotential) {
            ctx.fillStyle = Colours.midBlue;
            ctx.strokeStyle = Colours.midBlue;
        }

        if (note.select) {
            ctx.beginPath();
            ctx.arc(x, y, lineHeight, 0, 2 * Math.PI);
            ctx.strokeStyle = Colours.orange;
            ctx.fillStyle = Colours.orange;
            ctx.stroke();
        }

        if (note.hover) {
            ctx.strokeStyle = Colours.orange;
            ctx.fillStyle = Colours.orange;
        }

        if (note.noteLength == Model.NoteLength.Breve) {
            ctx.lineWidth = 2;
            return;
        }

        //draw the note
        ctx.beginPath();
        ctx.arc(x, y, lineHeight / 2, 0, 2 * Math.PI, false);
        
        if (note.noteLength == Model.NoteLength.SemiBreve) {
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.lineWidth = 1;
        }
        else {
            if (note.noteLength == Model.NoteLength.Minim) {
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.lineWidth = 1;
            }
            else {
                ctx.fill();
            }
					
            //draw the stem
            ctx.beginPath();
            if (note.stemUp) {
                ctx.moveTo(x + lineHeight / 2 - 0.5, y);
                ctx.lineTo(x + lineHeight / 2 - 0.5, y - lineHeight * 7 / 2);
                ctx.stroke();

                if (note.noteLength > Model.NoteLength.Crotchet) {
                    var tailX = x + lineHeight / 2 - 0.5;
                    var tailY = y - lineHeight * 7 / 2;
                    var tailController = note.noteLength - Model.NoteLength.Crotchet;
                    var tailNum = 0;
                    while (tailController >= 1) {
                        ctx.beginPath();
                        ctx.moveTo(tailX, tailY);
                        ctx.bezierCurveTo(tailX + 1, tailY + 10, tailX + 15, tailY + 13, tailX + 7, tailY + 25);
                        ctx.bezierCurveTo(tailX + 13, tailY + 13, tailX, tailY + 8, tailX, tailY + 15);
                        ctx.lineTo(tailX, tailY);
                        ctx.fill();
                        ctx.stroke();
                        tailController--;
                        if (tailNum == 0) { tailY += 10; }
                        else if (tailNum == 1) { tailY -= 20; }
                        else { tailY -= 10; }
                        tailNum++;
                    }
                }
            }
            else {
                ctx.moveTo(x - lineHeight / 2 + 0.5, y);
                ctx.lineTo(x - lineHeight / 2 + 0.5, y + lineHeight * 7 / 2);
                ctx.stroke();

                if (note.noteLength > Model.NoteLength.Crotchet) {
                    var tailX = x + 0.5 - lineHeight / 2;
                    var tailY = y + lineHeight * 7 / 2;
                    var tailController = note.noteLength - Model.NoteLength.Crotchet;
                    var tailNum = 0;
                    while (tailController >= 1) {
                        ctx.beginPath();
                        ctx.moveTo(tailX, tailY);
                        ctx.bezierCurveTo(tailX + 1, tailY - 10, tailX + 15, tailY - 13, tailX + 7, tailY - 25);
                        ctx.bezierCurveTo(tailX + 13, tailY - 13, tailX, tailY - 8, tailX, tailY - 15);
                        ctx.lineTo(tailX, tailY);
                        ctx.fill();
                        ctx.stroke();
                        tailController--;
                        if (tailNum == 0) { tailY -= 10; }
                        else if (tailNum == 1) { tailY += 20; }
                        else { tailY += 10; }
                        tailNum++;
                    }
                }
            }
        }
    }

    export class Note extends Notation {

        noteLength: Model.NoteLength;
        isPotential: boolean = false;

        constructor(public stemUp: boolean) {

            super();
        }

    }

    export class Breve extends Note {
        noteLength = Model.NoteLength.Breve;

        draw(ctx: CanvasRenderingContext2D) {
            ctx.beginPath();
            ctx.fillStyle = Colours.white;
            ctx.strokeStyle = Colours.black;
            ctx.rect(this.x - 5, this.y - 5, 10, 10);
            ctx.stroke();

            return true;
        }
    }

    export class SemiBreve extends Note {
        noteLength = Model.NoteLength.SemiBreve;

        draw(ctx: CanvasRenderingContext2D) {
            drawNote(ctx, this.x, this.y, this, 10);
            return true;
        }
    }

    export class Minim extends Note {
        noteLength = Model.NoteLength.Minim;

        draw(ctx: CanvasRenderingContext2D) {
            drawNote(ctx, this.x, this.y, this, 10);
            return true;
        }
    }

    export class Crotchet extends Note {
        noteLength = Model.NoteLength.Crotchet;

        draw(ctx: CanvasRenderingContext2D) {
            drawNote(ctx, this.x, this.y, this, 10);
            return true;
        }
    }

    export class Quaver extends Note {
        noteLength = Model.NoteLength.Quaver;

        draw(ctx: CanvasRenderingContext2D) {
            drawNote(ctx, this.x, this.y, this, 10);
            return true;
        }
    }

    export class SemiQuaver extends Note {
        noteLength = Model.NoteLength.SemiQuaver;

        draw(ctx: CanvasRenderingContext2D) {
            drawNote(ctx, this.x, this.y, this, 10);
            return true;
        }
    }

    export class DemiSemiQuaver extends Note {
        noteLength = Model.NoteLength.DemiSemiQuaver;

        draw(ctx: CanvasRenderingContext2D) {
            drawNote(ctx, this.x, this.y, this, 10);
            return true;
        }
    }

    export class HemiDemiSemiQuaver extends Note {
        noteLength = Model.NoteLength.HemiDemiSemiQuaver;

        draw(ctx: CanvasRenderingContext2D) {
            drawNote(ctx, this.x, this.y, this, 10);
            return true;
        }
    }
}