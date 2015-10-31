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
            this._currentMouse = mouseType;
        }

        get currentMouse(): MouseType {
            return this._currentMouse;
        }

    }

} 