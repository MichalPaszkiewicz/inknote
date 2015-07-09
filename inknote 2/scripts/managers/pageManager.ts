module Inknote.Managers {

    export enum Page{

        Score,
        Form,
        File,
        List

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
        }

        constructor() {
            this.page = Page.Score;

            this.openPageFromURL();
        }

    }

} 