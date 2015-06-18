module Inknote.Storage {
    
    var defaults = {
        settings: "settings",
        projects: "projects"
    }

    function getLocal(key: string): any {

        return JSON.parse(localStorage.getItem("inknote-" + key));

    }

    function saveLocal(key: string, item: any): any {

        localStorage.setItem("inknote-" + key, JSON.stringify(item));

    }

    export function getSettings(): Setting[]{

        var result = getLocal(defaults.settings);

        if (result instanceof Array === true && allItemsAre(result, function (item) {
            return item instanceof Setting;
        })) {
            return <Setting[]>result;
        }

        log("localStorage settings are not saved in the correct format");
        
        return [];
    }

    export function getProjects(): CompressedProject[] {

        var result = getLocal(defaults.projects);

        if (result instanceof Array === true && allItemsAre(result, function (item) {
            return !!item.ID && !!item.name
        })) {
            return <CompressedProject[]>result;
        }

        log("localStorage projects are not saved in the correct format");

        return [];
    }

    export function saveProjects(projects: CompressedProject[]) {

        saveLocal(defaults.projects, projects);

    }
} 