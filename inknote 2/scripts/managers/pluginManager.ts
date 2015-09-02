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

        getCompressedPlugins(): Plugins.Compressed.InknotePlugin[] {
            var plugins = this.plugins;

            var compressedPlugins = [];

            for (var i = 0; i < plugins.length; i++) {
                var newPlugin = new Plugins.Compressed.InknotePlugin(plugins[i].name);
                newPlugin.ID = plugins[i].ID;
                newPlugin.active = plugins[i].active;
                newPlugin.allowOnDraw = plugins[i].allowOnDraw;
                newPlugin.allowOnSave = plugins[i].allowOnSave;
                var pluginName = this.findPluginNameByName(plugins[i].name);
                newPlugin.URL = pluginName.URL;
                newPlugin.description = pluginName.description;

                compressedPlugins.push(newPlugin);
            }

            return compressedPlugins;
        }

        addPlugin(plugin: Inknote.Plugins.InknotePlugin) {
            this._plugins.push(plugin);
        }

        private _pluginNames: Plugins.InknotePluginName[];

        get pluginNames() {
            return this._pluginNames;
        }

        addPluginName(pluginName: Inknote.Plugins.InknotePluginName, multipleUse?: boolean) {
            this._pluginNames.push(pluginName);

            if (multipleUse !== true) {
                this.generatePluginHtml();
            }
        }

        addPluginNames(pluginNames: Inknote.Plugins.InknotePluginName[]) {
            for (var pluginName in pluginNames) {
                this.addPluginName(pluginNames[pluginName], true);
            }

            this.generatePluginHtml();
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

        setPluginNameVal(name: string, val: boolean) {

            this._pluginNames[name].active = val;

            this.generatePluginHtml();

            setTimeout(function () {
                Storage.savePlugins();
            }, 200);

        }

        private generateListHtml() {
            var self = this;

            var div = <HTMLDivElement>document.getElementById("plugin-list-items");

            // clear html
            div.innerHTML = "";

            // add plugin list.
            for (var plugin in this._pluginNames) {
                var pluginName = this._pluginNames[plugin];

                var plugDiv = document.createElement("div");
                plugDiv.className = "plugin-list-item";

                var plugDivText = document.createElement("div");
                plugDivText.innerText = pluginName.name + " - " + pluginName.description;
                plugDivText.style.display = "inline-block";

                var plugCheck = document.createElement("input");
                plugCheck.type = "checkbox";
                plugCheck.checked = pluginName.active;
                plugCheck.id = "plugin-" + plugin;

                plugCheck.onclick = function (ev) {
                    var target = <HTMLInputElement>ev.target;

                    if (target.checked) {

                        check("Are you sure you want this plugin?", function () {
                            self.setPluginNameVal(target.id.split("-")[1], target.checked);
                        }, function () {
                                target.checked = !target.checked;
                            });

                    }
                    else {
                        self.setPluginNameVal(target.id.split("-")[1], target.checked);
                    }
                }

                plugDiv.appendChild(plugCheck);
                plugDiv.appendChild(plugDivText);

                div.appendChild(plugDiv);
            }
        }

        private getPluginsWithEvents(): { name: string; functions: string[] }[] {
            var plugins = getItemsWhere(this._plugins, function (item: Plugins.InknotePlugin) {
                return item.active;
            });

            var result = [];

            for (var i = 0; i < plugins.length; i++) {
                var existingFns = plugins[i].getExistingFunctions();

                if (existingFns.length > 0) {
                    result.push({
                        name: plugins[i].name,
                        functions: existingFns
                    });
                }
            }

            return result;
        }

        private getPluginsByEvents(): { event: string; plugins: string[] }[] {

            var sortedPluginEvents = [];

            var plugins = this.getPluginsWithEvents();

            for (var i = 0; i < plugins.length; i++) {
                var tmp = plugins[i];

                for (var j = 0; j < tmp.functions.length; j++) {
                    var tmpFn = tmp.functions[j];

                    var added = false;
                    for (var k = 0; k < sortedPluginEvents.length; k++) {
                        var sortedPlugin = sortedPluginEvents[k];
                        if (sortedPlugin.event == tmpFn) {
                            sortedPlugin.plugins.push(tmp.name);
                            added = true;
                        }
                    }
                    if (added == false) {
                        sortedPluginEvents.push({
                            event: tmpFn,
                            plugins: [tmp.name]
                        });
                    }
                }
            }

            return sortedPluginEvents;
        }

        setPluginOnSaveAllow(ID: string, value: boolean) {
            var name = ID.split("...")[1];
            var plugin = this.findPluginByName(name);

            plugin.allowOnSave = value;

            setTimeout(function () {
                Storage.savePlugins();
            }, 200);

        }

        setPluginOnDrawAllow(ID: string, value: boolean) {
            var name = ID.split("...")[1];
            var plugin = this.findPluginByName(name);

            plugin.allowOnDraw = value;

            setTimeout(function () {
                Storage.savePlugins();
            }, 200);

        }

        setPluginOnBeforeDrawAllow(ID: string, value: boolean) {
            var name = ID.split("...")[1];
            var plugin = this.findPluginByName(name);

            plugin.allowBeforeDraw = value;

            setTimeout(function () {
                Storage.savePlugins();
            }, 200);

        }

        private generateEventListHtml() {
            var self = this;

            var pluginsByEvents = this.getPluginsByEvents();

            var div = <HTMLDivElement>document.getElementById("plugin-event-list");

            // clear html
            div.innerHTML = "<h3>Events</h3>";

            // add event list.
            for (var i = 0; i < pluginsByEvents.length; i++) {
                var event = pluginsByEvents[i].event;
                var plgs = pluginsByEvents[i].plugins;

                var eventDiv = document.createElement("div");

                eventDiv.innerText = event;
                eventDiv.className = "plugin-list-item";

                div.appendChild(eventDiv);

                var pluginsDiv = document.createElement("div");

                for (var j = 0; j < plgs.length; j++) {

                    var plugin = this.findPluginByName(plgs[j]);

                    if (plugin != null) {

                        var plgCheck = document.createElement("input");
                        plgCheck.type = "checkbox";

                        switch (event) {
                            case null:
                                break;
                            case "before draw":
                                plgCheck.checked = plugin.allowBeforeDraw;
                                var pluginName = plugin.name;
                                plgCheck.id = "ondraw..." + pluginName;
                                plgCheck.onclick = function (ev) {
                                    var target = <HTMLInputElement>ev.target;
                                    self.setPluginOnBeforeDrawAllow(target.id, target.checked);
                                }
                                break;
                            case "on draw":
                                plgCheck.checked = plugin.allowOnDraw;
                                var pluginName = plugin.name;
                                plgCheck.id = "ondraw..." + pluginName;
                                plgCheck.onclick = function (ev) {
                                    var target = <HTMLInputElement>ev.target;
                                    self.setPluginOnDrawAllow(target.id, target.checked);
                                }
                                break;
                            case "on save":
                                plgCheck.checked = plugin.allowOnSave;
                                var pluginName = plugin.name;
                                plgCheck.id = "onsave..." + pluginName;
                                plgCheck.onclick = function (ev) {
                                    var target = <HTMLInputElement>ev.target;
                                    self.setPluginOnSaveAllow(target.id, target.checked);
                                }
                                break;
                        }

                        var plgRow = document.createElement("div");
                        plgRow.appendChild(plgCheck);

                        var plgSpan = document.createElement("span");
                        plgSpan.innerText = plgs[j];

                        plgRow.appendChild(plgSpan);
                        pluginsDiv.appendChild(plgRow);

                    }
                }

                div.appendChild(pluginsDiv);
            }

        }

        private generateAdvancedHtml() {

        }

        generatePluginHtml() {
            if (typeof document != "undefined"){
                this.generateListHtml();
                this.generateEventListHtml();
                this.generateAdvancedHtml();
            }
        }

        findPluginByName(name: string): Plugins.InknotePlugin {
            var items = getItemsWhere(this._plugins, function (item: Plugins.InknotePlugin) { return item.name == name; });

            if (items.length == 0) {
                return null;
            }

            return items[0];
        }

        findPluginNameByName(name: string): Plugins.InknotePluginName {
            var items = getItemsWhere(this._pluginNames, function (item: Plugins.InknotePluginName) {
                return item.name == name;
            });

            if (items.length == 0) {
                return null;
            }

            return items[0];
        }

        constructor() {
            this._plugins = [];
            this._pluginNames = [];

        }
    }

}

