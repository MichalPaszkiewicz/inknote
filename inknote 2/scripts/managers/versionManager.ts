module Inknote.Managers {

    export class VersionManager {

        version: string = "0.1";

        private static _instance: VersionManager;

        static get Instance(): VersionManager {
            if (!VersionManager._instance) {
                VersionManager._instance = new VersionManager();
            }

            return this._instance;
        }

        constructor() {

        }

    }

} 