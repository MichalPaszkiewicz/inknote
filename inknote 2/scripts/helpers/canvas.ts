module Inknote {

    export function drawTextAlongArc(
        context: CanvasRenderingContext2D,
        str: string,
        centerX: number,
        centerY: number,
        radius: number,
        angle: number) {

        var len = str.length, s;
        context.save();
        context.translate(centerX, centerY);
        context.rotate(-1 * angle / 2);
        context.rotate(-1 * (angle / len) / 2);
        for (var n = 0; n < len; n++) {
            context.rotate(angle / len);
            context.save();
            context.translate(0, -1 * radius);
            s = str[n];
            context.font = "12px Arial";
            context.shadowColor = "black";
            context.shadowOffsetX = 1;
            context.shadowOffsetY = 1;
            context.shadowBlur = 1;
            context.fillText(s, 0, 0);
            context.restore();
        }
        context.restore();
    }

}