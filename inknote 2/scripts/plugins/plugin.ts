module Inknote.Plugins {

    export class InknotePluginName{
        private _active: boolean = false;
        hasOpenedURL: boolean = false;

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
            }
        }

        onSave: () => void;
        allowOnSave: boolean = true;

        onDraw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
        allowOnDraw: boolean = true;

        getExistingFunctions(): string[] {
            var fns = [];

            if (this.onSave){
                fns.push("on save");
            }
            if (this.onDraw) {
                fns.push("on draw");
            }

            return fns;
        }
        
        constructor(public name: string) {

        } 
    }

} 