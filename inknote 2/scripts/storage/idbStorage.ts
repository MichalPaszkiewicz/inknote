module Inknote.Storage {

    export class IDBTable {

        private setStringItem(key: string, value: string) {
            if (!key) {
                log("you must have a key when setting a value", MessageType.Error);

                return;
            }

            var getRequest = this.objectStore.get(key);

            var self = this;

            // if doesn't exist
            getRequest.onerror = function (e) {
                self.objectStore.add(value, key);
            }

            // if exists
            getRequest.onsuccess = function (e) {
                self.objectStore.delete(key);
                self.objectStore.add(value, key);
            }
        }

        setItem(key: string, value: any) {
            if (typeof (value) != typeof ("")) {
                value = JSON.stringify(value);
            }

            this.setStringItem(key, value);

        }

        getItemThen(key: string, callback: (item: any) => void){
            if (!key) {
                log("you can only retrieve items if you have their keys", MessageType.Error);
            }

            var getRequest = this.objectStore.get(key);

            getRequest.onerror = function (e) {
                callback(null);
            }

            getRequest.onsuccess = function (e) {
                callback(getRequest.result);
            }

        }

        constructor(public objectStore: IDBObjectStore) {

        }

    }

    export class IDBDB {

        createTable(key: string) {
            this.database.createObjectStore(key);
        }

        getTableThen(key: string, callback: (table: IDBTable) => void){

            this.createTable(key);

            var objectStore = this.database.transaction(key).objectStore(key);

            var table = new IDBTable(objectStore);

            callback(table);

        }

        constructor(public database: IDBDatabase) {
           
        }

    }

    export class IDBManager{

        private static _instance: IDBManager;

        static get Instance() {
            if (!IDBManager._instance) {
                IDBManager._instance = new IDBManager();
            }
            return IDBManager._instance;
        }

        get isIDBWorking(): boolean {
            return typeof (IDBDatabase) == "function";
        }

        getDBThen(key: string, callBack: (db: IDBDB) => void) {
            var DBOpenRequest = window.indexedDB.open(key);

            DBOpenRequest.onerror = function (e) {
                log("error loading indexedDB '" + key + "'", MessageType.Error);
            }

            DBOpenRequest.onsuccess = function (e) {
                var db = <IDBDatabase>DBOpenRequest.result;

                var idbdb = new IDBDB(db);
                
                callBack(idbdb);
            }
        }
        
    }

} 