module Inknote.Storage {
    
    var defaults = {
        settings: "settings",
        projects: "projects"
    }

    function getLocal(key: string): any {

        if (!localStorage) {
            log("Local storage is undefined");
            return null;
        }

        return JSON.parse(localStorage.getItem("inknote-" + key));

    }

    function saveLocal(key: string, item: any): any {

        if (Managers.SettingsManager.Current.testMode) {
            return;
        }

        if (!localStorage) {
            log("Local storage is undefined");
            return null;
        }

        localStorage.setItem("inknote-" + key, JSON.stringify(item));

    }

    export function getSettings(): Setting[]{

        if (Managers.SettingsManager.Current.testMode) {
            return [];
        }

        var result = getLocal(defaults.settings);

        if (result instanceof Array === true && allItemsAre(result, function (item) {
            return item instanceof Setting;
        })) {
            return <Setting[]>result;
        }

        log("localStorage settings are not saved in the correct format");
        
        return [];
    }

    export function getProjects(): Compressed.CompressedProject[]{

        if (Managers.SettingsManager.Current.testMode) {
            return [Testing.$TEST$_compressedProject];
        }

        var result = getLocal(defaults.projects);

        if (result instanceof Array === true && allItemsAre(result, function (item) {
            return !!item.ID && !!item.name
        })) {
            return <Compressed.CompressedProject[]>result;
        }

        log("localStorage projects are not saved in the correct format");

        return [];
    }

    export function saveProjects(projects: Compressed.CompressedProject[]) {

        saveLocal(defaults.projects, projects);

        // ensure is there to deal with dependency
        if (Managers.PluginManager) {
            var plugins = <Inknote.Plugins.InknotePlugin[]>getItemsWhere(Managers.PluginManager.Instance.plugins, function (item: Plugins.InknotePlugin) {
                return item.active && item.allowOnSave && item.onSave != null;
            });

            for (var i = 0; i < plugins.length; i++) {
                plugins[i].onSave();
            }
        }

    }
} 