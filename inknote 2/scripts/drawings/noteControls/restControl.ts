module Inknote.Drawing {

    export class RestControl implements IDrawable{

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

        click(e: MouseEvent) {
            var x = e.clientX;

            NoteControlService.Instance.addRest();
        }

        draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): boolean {
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.fillStyle = Colours.white;
            if (this.hover){
                ctx.fillStyle = Colours.orange;
            }
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fill();

            var modelRest = new Model.Rest(NoteControlService.Instance.lengthControl.selectedLength);
            var rest = getDrawingItemFromRest(modelRest);

            rest.y = this.y + this.height / 2;
            rest.x = this.x + this.width / 2;

            rest.draw(ctx);

            return true;
        }

    }

}