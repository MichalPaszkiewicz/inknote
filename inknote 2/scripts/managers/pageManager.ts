module Inknote.Managers {

    export enum Page{

        Score,
        Form,
        File,
        List,
        Licence

    }

    function pageName(page: Page): string {

        switch (page) {
            case Page.Score:
                return "Score";
            case Page.Form:
                return "Form";
            case Page.File:
                return "File";
            case Page.List:
                return "List";
            case Page.Licence:
                return "Licence";
        }
    }

    export class PageManager {

        private _page: Page;

        get page() {
            return this._page;
        }

        set page(item: Page) {
            var pageURL = "?" + pageName(item);

            switch (item) {
                case Page.File:
                    break;
                case Page.Form:
                    break;
                case Page.List:
                    break;
                case Page.Score:
                    pageURL += "=" + ProjectManager.Instance.currentProject.ID;
                    break;
                case Page.Licence:
                    window.location.href = "./licence";
                    return;
            }

            window.history.pushState(null, pageURL, pageURL);
            this._page = item;
        }

        private static _current: PageManager;

        static get Current(): PageManager {

            if (!PageManager._current) {
                PageManager._current = new PageManager();
            }

            return PageManager._current;
        }

        openNewPage(page: Page, ID: string) {
            var newURL = "?"; 
            console.log(newURL);
            
            newURL += pageName(page);
            newURL += "=";
            newURL += ID;

            window.open(newURL);
        }

        openPageFromURL() {
            var search = window.location.search.replace("?","");
            var searches = search.split("&");
            
            for (var i = 0; i < searches.length; i++){
                var keyValue = searches[i].split("=");
                if (Page[keyValue[0]]) {
                    this.page = Page[keyValue[0]];
                }
            }

            if (this._page == null) {
                this.page = Page.Score;
            }
        }

        constructor() {
            this.openPageFromURL();
        }

    }

} 