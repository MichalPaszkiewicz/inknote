/// <reference path="defs.ts" />

module Inknote.Plugins {
     
    var plugin1 = new InknotePlugin("snow background");

    var flakes = [];

    var variableLeft = function (t) {
        return 10 * Math.sin(t / 250);
    }
    var speed = function (t) {
        return 2 * Math.abs(Math.cos(t / 250)) + 2;
    }

    plugin1.beforeDraw = function (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {

        ctx.beginPath();
        ctx.fillStyle = "rgb(215,225,255)";
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();

        if (flakes.length == 0) {
            for (var i = 0; i < 50; i++) {
                flakes.push({ t: Math.floor(Math.random() * canvas.height), left: Math.floor(Math.random() * canvas.width) });
            }
        }

        for (var i = 0; i < flakes.length; i++) {
            flakes[i].t += speed(flakes[i].t);
            flakes[i].left++;

            if (flakes[i].t > canvas.height) {
                flakes[i].t = 0;
                flakes[i].left = canvas.width * Math.random();
            }

            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.arc(flakes[i].left + variableLeft(flakes[i].t), flakes[i].t, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    Inknote.Managers.PluginManager.Instance.addPlugin(plugin1);

}   