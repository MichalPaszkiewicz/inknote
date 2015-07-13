module Inknote.Plugins {
    export declare class InknotePlugin {
        constructor(string);
        onDraw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;

        onSave: () => void;
    }
}

module Inknote.Managers {
    export declare class PluginManager {
        static Instance: PluginManager;

        addPlugin: (item: Inknote.Plugins.InknotePlugin) => void;
    };
}

module Inknote.Plugins {
     
    var plugin1 = new InknotePlugin("plugin1");

    plugin1.onDraw = function (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        
    }

    plugin1.onSave = function () {

    }

    Inknote.Managers.PluginManager.Instance.addPlugin(plugin1);

}   