module Inknote.Plugins {

    export class InknotePluginName{
        private _active: boolean = false;
        hasOpenedURL: boolean = false;

        allowOnDraw: boolean;
        allowOnSave: boolean;
        allowBeforeDraw: boolean;
        allowOnPluginLoad: boolean;
        allowOnPluginUnLoad: boolean; 
        allowOnAppStart: boolean;

        get active() {
            return this._active;
        }

        set active(newValue: boolean) {

            if (this.hasOpenedURL) {
                var plugin = Managers.PluginManager.Instance.findPluginByName(this.name);
                plugin.active = newValue;

                // if loaded, needs to refresh sync.
                Managers.PluginManager.Instance.generatePluginHtml();

            }
            else {
                var script = document.createElement("script");
                script.src = this.URL;
                script.onload = function () {
                    // needs to be called on load to be async.
                    Managers.PluginManager.Instance.generatePluginHtml();
                    return false;
                }
                var head = document.getElementsByTagName("head")[0];
                head.appendChild(script);
                       
                this.hasOpenedURL = true;
            }
            this._active = newValue;
            
        }


        constructor(public name: string, public URL: string, public description: string) {



        }

    }

    export class InknotePlugin implements IIdentifiable{
        ID = getID();

        _active = true;

        get active() {
            return this._active;
        }

        set active(newValue: boolean) {            
            this._active = newValue;

            if (newValue) {
                this.allowOnDraw = true;
                this.allowOnSave = true;
                this.allowBeforeDraw = true;
                
                if(this.onPluginLoad){
                    this.onPluginLoad();
                }
            }
            else{
                if(this.onPluginUnLoad){
                    this.onPluginUnLoad();
                }
            }
        }

        onSave: () => void;
        allowOnSave: boolean = true;

        beforeDraw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
        allowBeforeDraw: boolean = true;

        onDraw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
        allowOnDraw: boolean = true;
        
        onPluginLoad: () => void;
        allowOnPluginLoad: boolean = true;
        
        onPluginUnLoad: () => void;
        allowOnPluginUnload: boolean = true;
        
        onAppStart: () => void;
        allowOnAppStart: boolean = true;

        getExistingFunctions(): string[] {
            var fns = [];

            if (this.onSave){
                fns.push("on save");
            }
            if (this.onDraw) {
                fns.push("on draw");
            }
            if (this.beforeDraw) {
                fns.push("before draw");
            }
            if(this.onPluginLoad){
                fns.push("on plugin load");
            }
            if(this.onPluginUnLoad){
                fns.push("on plugin unload");
            }
            if(this.onAppStart){
                fns.push("on app start");
            }

            return fns;
        }
        
        constructor(public name: string) {

            var existingName = Inknote.Managers.PluginManager.Instance.findPluginNameByName(name);
            if (existingName) {
                if (existingName.allowOnDraw != null) {
                    this.allowOnDraw = existingName.allowOnDraw;
                }
                if (existingName.allowOnSave != null) {
                    this.allowOnSave = existingName.allowOnSave;
                }
                if (existingName.allowBeforeDraw != null) {
                    this.allowBeforeDraw = existingName.allowBeforeDraw;
                }
                if(existingName.allowOnPluginLoad != null){
                    this.allowOnPluginLoad = existingName.allowOnPluginLoad;
                }
                if(existingName.allowOnPluginUnLoad != null){
                    this.allowOnPluginUnload = existingName.allowOnPluginUnLoad;
                }
                if(existingName.allowOnAppStart != null){
                    this.allowOnAppStart = existingName.allowOnAppStart;
                }

                this.active = existingName.active;
            }
            else {
                this.active = false;
            }

        } 
    }

} 