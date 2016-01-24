module Inknote {

    export function canScroll(up: boolean): boolean {

        if (up && ScrollService.Instance.y - ScrollService.Instance.scrollSpeed < 0) {
            ScrollService.Instance.y = 0;
            return false;
        }
        else if (up) {
            return true;
        }

        switch (Managers.PageManager.Current.page) {
            case Managers.Page.File:
                var projects = Managers.ProjectManager.Instance.allProjects.length;
                var canvas = { x: window.innerWidth, y: window.innerHeight - 100 };
                var maxRowNo = Math.floor(canvas.x / 200);
                var maxHeight = Math.ceil(projects / maxRowNo) * 200 + 100;
                return maxHeight > ScrollService.Instance.y + ScrollService.Instance.scrollSpeed + canvas.y;
                break;
            case Managers.Page.Score:
                return ScrollService.Instance.y < ScoringService.Instance.maxScrollPosition;
                break;
            default:
                return false;
        }
    }

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
                        ScrollService._scrollBar = new Drawing.ScrollBar.ProjectScroll();
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