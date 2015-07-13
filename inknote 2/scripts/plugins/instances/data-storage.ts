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

    var dataStorage = new InknotePlugin("data storage");

    dataStorage.onSave = function () {
        console.log("storage plugin tested");
    }

    Inknote.Managers.PluginManager.Instance.addPlugin(dataStorage);
     
}         