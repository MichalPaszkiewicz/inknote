module Inknote.Managers {

    export enum MouseType{
        NORMAL,
        PENCIL
    }

    export class MouseManager {

        private static _instance: MouseManager;

        static get Instance(): MouseManager {
            if (!MouseManager._instance) {
                MouseManager._instance = new MouseManager();
            }
            return MouseManager._instance;
        }

        private _currentMouse: MouseType = MouseType.NORMAL;

        set currentMouse(mouseType: MouseType) {
            if (mouseType == MouseType.PENCIL) {
                if (DrawService.Instance.canvas.className.indexOf("pencilMode") == -1) {
                    DrawService.Instance.canvas.className += " pencilMode";
                }
            }
            else {
                DrawService.Instance.canvas.className = DrawService.Instance.canvas.className.replace(/pencilMode/g, "");
            }

            this._currentMouse = mouseType;
        }

        get currentMouse(): MouseType {
            return this._currentMouse;
        }

    }

} 