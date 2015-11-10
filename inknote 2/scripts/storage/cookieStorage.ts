module Inknote.Storage {

    export class CookieManager {

        private static _instance: CookieManager;

        static get Instance(): CookieManager {
            if (!CookieManager._instance) {
                CookieManager._instance = new CookieManager();
            }

            return CookieManager._instance;
        }

        private get _cookieJSON(): Object {

            if (typeof (document) == typeof (undefined)) {
                return {};
            }

            var cookieString = document.cookie;

            if (cookieString == "" || cookieString == null) {
                return {};
            }

            var jsonObject = JSON.parse(cookieString);

            if (typeof (jsonObject) != typeof ({})) {
                return {};
            }

            return jsonObject;
        }

        getItem(key: string): string {

            return this._cookieJSON[key];
             
        }

        private _setStringItem(key: string, value: string) {

            var cookieObject = this._cookieJSON;

            cookieObject[key] = value;

            document.cookie = JSON.stringify(cookieObject);

            log("saved " + key);

        }

        setItem(key: string, value: any) {

            if (typeof (value) != typeof ("")) {
                value = JSON.stringify(value);
            }

            try {
                this._setStringItem(key, value);
            }
            catch(e){
                log("saving cookie failed.", MessageType.Warning);

                console.log(e);
            }
        }

    }

}