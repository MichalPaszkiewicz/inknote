/// <reference path="defs.ts" />

module Inknote.Plugins {

    var plugin2 = new InknotePlugin("plugin2");

    plugin2.onDraw = function (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 20, 20);
        ctx.fillText("Plugin 2 in use", 60, 20);
    }

    plugin2.onPluginLoad = function(){
        var a = document.getElementById("title-text");
        a.style.color = "red";
    }
    
    plugin2.onPluginUnload = function(){
        var a = document.getElementById("title-text");
        a.style.color = "white";
    }
    
    Inknote.Managers.PluginManager.Instance.addPlugin(plugin2);

}   