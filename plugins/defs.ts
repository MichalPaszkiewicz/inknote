module Inknote.Plugins {
    export declare class InknotePlugin {
        constructor(string);

        beforeDraw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;

        onDraw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;

        onSave: () => void;
        
        onPluginLoad: () => void;
        
        onPluginUnload: () => void;
        
        onAppStart: () => void;

    }
}

module Inknote.Managers {
    export declare class PluginManager {
        static Instance: PluginManager;

        addPlugin: (item: Inknote.Plugins.InknotePlugin) => void;
    };
}
