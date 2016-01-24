module Inknote.Drawing {

    export class Piano implements IDrawable {

        ID = getID();
        x = 0;
        y = 500;
        width = 500;
        height = 100;
        order = 200;
        hover: boolean;
        select: boolean;

        leftHover: boolean = false;
        rightHover: boolean = false;

        octave: number = 4;

        blackKeys: BlackKey[] = [];
        whiteKeys: WhiteKey[] = [];

        get allKeys(): PianoKey[] {
            return this.whiteKeys.concat(this.blackKeys);
        }

        isOver(x: number, y: number) {

            var result = y > this.y && y < this.y + this.height && x < this.x + this.width;

            this.leftHover = false;
            this.rightHover = false;

            if (result) {

                if (x < this.width / 9) {
                    this.leftHover = true;
                }
                else if (x > this.width * 8 / 9) {
                    this.rightHover = true;
                }

                var isBlack = false;

                for (var i = 0; i < this.blackKeys.length; i++) {
                    if (this.blackKeys[i].isOver(x, y)) {
                        this.blackKeys[i].hover = true;
                        isBlack = true;
                    }
                    else {
                        this.blackKeys[i].hover = false;
                    }
                }

                for (var i = 0; i < this.whiteKeys.length; i++) {
                    if (isBlack === false && this.whiteKeys[i].isOver(x, y)) {
                        this.whiteKeys[i].hover = true;
                    }
                    else {
                        this.whiteKeys[i].hover = false;
                    }
                }

            }
            else {
                for (var i = 0; i < this.allKeys.length; i++) {
                    this.allKeys[i].hover = false;
                }
            }

            return result;

        }

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
            ctx.globalAlpha = 0.5;
            ctx.beginPath();

            ctx.fillStyle = Colours.white;
            ctx.strokeStyle = Colours.black;

            ctx.rect(this.x, this.y, this.width, this.height);

            ctx.fill();
            ctx.stroke();

            ctx.textBaseline = "base";

            var noteVal = 2;
            var whiteKeyNum = 0;
            var blackKeyNum = 0;

            for (var i = 1; i < 9; i++) {
                ctx.beginPath();
                ctx.strokeStyle = Colours.black;

                if (i == 1 && this.leftHover) {
                    ctx.beginPath();
                    ctx.fillStyle = Colours.orange;
                    ctx.rect(0, this.y, this.width / 9, this.height);
                    ctx.fill();
                }
                else if (i == 8 && this.rightHover) {
                    ctx.beginPath();
                    ctx.fillStyle = Colours.orange;
                    ctx.rect(this.width * 8 / 9, this.y, this.width / 9, this.height);
                    ctx.fill();
                }

                if (i != 8) {
                    noteVal = (noteVal + 1) % 12;

                    if (this.whiteKeys[whiteKeyNum] == null) {
                        this.whiteKeys.push(new WhiteKey(this.width * i / 9, this.y, this.width / 9, this.height, noteVal));
                    }

                    this.whiteKeys[whiteKeyNum].x = this.width * i / 9;
                    this.whiteKeys[whiteKeyNum].y = this.y;
                    this.whiteKeys[whiteKeyNum].width = this.width / 9;
                    this.whiteKeys[whiteKeyNum].height = this.height;

                    whiteKeyNum++;
                }

                if (i == 1 || i == 2 || i == 4 || i == 5 || i == 6) {

                    noteVal = (noteVal + 1) % 12;

                    if (this.blackKeys[blackKeyNum] == null) {
                        this.blackKeys.push(new BlackKey(this.width * (i + 1) / 9 - this.width / 24, this.y, this.width / 12, this.height / 2, noteVal));
                    }

                    this.blackKeys[blackKeyNum].x = this.width * (i + 1) / 9 - this.width / 24;
                    this.blackKeys[blackKeyNum].y = this.y;
                    this.blackKeys[blackKeyNum].width = this.width / 12;
                    this.blackKeys[blackKeyNum].height = this.height / 2;

                    blackKeyNum++;

                }

            }

            for (var i = 0; i < this.whiteKeys.length; i++) {
                this.whiteKeys[i].draw(ctx);
            }

            for (var i = 0; i < this.blackKeys.length; i++) {
                ctx.globalAlpha = 1;
                this.blackKeys[i].draw(ctx);
                ctx.globalAlpha = 0.5;
            }

            ctx.strokeStyle = Colours.black;

            // left arrow
            ctx.beginPath();
            ctx.moveTo(this.width / 15, this.y + this.height * 3 / 4);
            ctx.lineTo(this.width / 20, this.y + this.height / 2);
            ctx.lineTo(this.width / 15, this.y + this.height / 4);
            ctx.stroke();

            // right arrow
            ctx.beginPath();
            ctx.moveTo(this.width - this.width / 15, this.y + this.height * 3 / 4);
            ctx.lineTo(this.width - this.width / 20, this.y + this.height / 2);
            ctx.lineTo(this.width - this.width / 15, this.y + this.height / 4);
            ctx.stroke();

            // text
            ctx.beginPath();
            ctx.textAlign = "center";
            ctx.fillStyle = Colours.black; 
            ctx.font = (Math.min((this.width / 20), this.height / 4)) + "px Arial";
            ctx.fillText("C" + this.octave, this.width * 1 / 6, this.y + this.height * 3 / 4);
            ctx.globalAlpha = 1;

            return true;
        }

        click(e: MouseEvent | Touch) {

            if (e.clientX < this.width / 9) {
                this.octave--;
            }
            else if (e.clientX > this.width * 8 / 9) {
                this.octave++;
            }
            else {
                for (var i = 0; i < this.allKeys.length; i++) {
                    if (this.allKeys[i].hover == true) {
                        
                        if (ScoringService.Instance.selectID == null || ScoringService.Instance.SelectedItem instanceof Drawing.Bar) {
                            NoteControlService.Instance.addNote(
                                new Model.Note(
                                    this.allKeys[i].noteValue,
                                    this.octave,
                                    NoteControlService.Instance.lengthControl.selectedLength));
                        }
                        else {
                            NoteControlService.Instance.editNoteValueAndOctave(this.allKeys[i].noteValue, this.octave);
                        }
                    }
                }
            }
        }

        constructor() {

        }

    }

} 