module Inknote {

    export class ScrollService {

        private static _instance: ScrollService;

        static get Instance() {
            if (!ScrollService._instance) {
                ScrollService._instance = new ScrollService();
            }

            return ScrollService._instance;
        }

        x: number;
        y: number;

        scrollSpeed: number;

        constructor() {
            this.x = 0;
            this.y = 0;
            this.scrollSpeed = 20;
        }

        up() {
            this.y = this.y - this.scrollSpeed;

        }

        down() {
            this.y = Math.max(0, this.scrollSpeed + this.y);

        }

    }

} 