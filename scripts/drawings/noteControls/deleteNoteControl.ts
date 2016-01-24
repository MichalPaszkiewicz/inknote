module Inknote.Drawing {

    export class DeleteNoteControl implements IDrawable{

        x = 0;
        y = 500;
        width = 500;
        height = 100;
        order = 200;
        hover: boolean;
        select: boolean;

        attached: IDrawable[] = [];

        ID: string = "note_control";

        isOver(x: number, y: number): boolean {
            var result = y > this.y && y < this.y + this.height && x < this.x + this.width && x > this.x;

            this.hover = result;

            return result;
        }

        selectedLength: Model.NoteLength = 3;

        click(e: MouseEvent | Touch) {
            NoteControlService.Instance.deleteSelected();
        }

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.fillStyle = Colours.white;

            if (this.hover) {
                ctx.globalAlpha = 0.7;
            }

            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fill();

            ctx.beginPath();

            var lineLength = 10;
            ctx.lineWidth = 4;

            if (this.hover) {
                ctx.lineWidth = 6;
                lineLength = 12;
            }

            ctx.globalAlpha = 255;
            ctx.strokeStyle = Colours.brightRed;

            ctx.moveTo(this.x + this.width / 2 - lineLength, this.y + this.height / 2 - lineLength);
            ctx.lineTo(this.x + this.width / 2 + lineLength, this.y + this.height / 2 + lineLength);
            ctx.moveTo(this.x + this.width / 2 - lineLength, this.y + this.height / 2 + lineLength);
            ctx.lineTo(this.x + this.width / 2 + lineLength, this.y + this.height / 2 - lineLength);
            ctx.stroke();

            ctx.lineWidth = 1;

            return true;
        }

    }

} 