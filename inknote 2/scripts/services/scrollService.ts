module Inknote {

    export class ScrollService {

        private static _instance: ScrollService;

        static get Instance() {
            if (!ScrollService._instance) {
                ScrollService._instance = new ScrollService();
            }

            return ScrollService._instance;
        }

        private static _scrollBar: Drawing.ScrollBar.ScrollBar;
        private static _lastPageType: Managers.Page;

        static get ScrollBar(): Drawing.ScrollBar.ScrollBar{
            if (Managers.PageManager.Current.page != ScrollService._lastPageType) {
                ScrollService._lastPageType = Managers.PageManager.Current.page;
                
                switch (ScrollService._lastPageType) {
                    case Managers.Page.File:
                        ScrollService._scrollBar = new Drawing.ScrollBar.FileScroll();
                        break;
                    case Managers.Page.Score:
                        ScrollService._scrollBar = new Drawing.ScrollBar.ProjectDcroll();
                        break;
                    case Managers.Page.Form:
                    case Managers.Page.List:
                    default:
                        ScrollService._scrollBar = new Drawing.ScrollBar.ScrollBar();
                }

            }

            return ScrollService._scrollBar;
        }

        x: number;
        y: number;

        scrollSpeed: number;

        showScrollBar() {
            return false;
        }

        constructor() {
            this.x = 0;
            this.y = 0;
            this.scrollSpeed = 30;
        }

        up() {
            if (canScroll(true)){
                this.y = this.y - this.scrollSpeed;
            }
        }

        down() {
            if (canScroll(false)){
                this.y = Math.max(0, this.scrollSpeed + this.y);
            }
        }

    }

} 