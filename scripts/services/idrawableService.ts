module Inknote {

    export function sortByOrder(items: IDrawable[]) {
        items.sort(function (a:IDrawable, b:IDrawable) {
            return (a.order - b.order);
        });

        return items;
    }

    export function mouseIsOver(item: IDrawable, me: MouseEvent | Touch, canvas: HTMLCanvasElement) {
        var scroll = ScrollService.Instance;

        //console.log("item: (" + item.x + "," + item.y + ")");
        //console.log("mouse: (" + me.clientX + "," + me.clientY + ")");

        return item.isOver(me.clientX - scroll.x, me.clientY - 50, canvas);
    }

} 