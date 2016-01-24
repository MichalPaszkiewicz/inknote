module Inknote {

    export class TempDataService {
        private static _instance: TempDataService;

        static get Instance(): TempDataService {
            if (!TempDataService._instance) {
                TempDataService._instance = new TempDataService();
            }
            return TempDataService._instance;
        }

        private _currentData: TempData;

        get currentData(): TempData {
            if (!this._currentData) {
                this._currentData = Storage.getTemp();
            }
            return this._currentData;
        }

        update() {
            Storage.saveTemp();
        }

    }

}