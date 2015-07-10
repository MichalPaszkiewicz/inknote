module Inknote.Managers {

    export class PluginManager {
        private static _instance: PluginManager;

        static get Instance(): PluginManager {
            if (!PluginManager._instance) {
                PluginManager._instance = new PluginManager();
            }
            return PluginManager._instance;
        }

        private _plugins: Plugins.InknotePlugin[];

        get plugins() {
            return this._plugins;
        }

        addPlugin(plugin: Inknote.Plugins.InknotePlugin) {
            this._plugins.push(plugin);
        }

        removePlugin(ID: string): void {
            var newPlugins = [];
            for (var i = 0; i < this._plugins.length; i++) {
                if (this._plugins[i].ID != ID) {
                    newPlugins.push(this._plugins[i]);
                }
            }
            this._plugins = newPlugins;
        }

        constructor() {

        }
    }

}

