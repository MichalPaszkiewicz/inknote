module Inknote.Managers {

    export enum Page{

        Score,
        Form,
        File,
        List

    }

    export class PageManager {

        page: Page;


        private static _current: PageManager;

        static get Current(): PageManager {

            if (!PageManager._current) {
                PageManager._current = new PageManager();
            }

            return PageManager._current;
        }

        constructor() {
            this.page = Page.Score;
        }

    }

} 