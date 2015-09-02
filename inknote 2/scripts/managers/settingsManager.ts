module Inknote.Managers {

    export class SettingsManager {
        private static _instance: SettingsManager;

        private _settings: Setting[];

        private _currentSetting: Setting;

        static get Current() {
            return SettingsManager.Instance.getCurrentSetting();
        }

        getCurrentSetting() {
            var inst = SettingsManager.Instance;

            if (!inst._currentSetting) {
                if (!inst._settings || inst._settings.length < 1) {
                    inst.addSetting(new Setting("Default"));
                }

                inst.setCurrentSetting(inst.getSettings()[0]);
            }

            return inst._currentSetting;
        }

        setCurrentSetting(setting: Setting) {
            this._currentSetting = setting;
        }

        public getSettings(): Setting[] {
            return this._settings;
        }

        public setSettings(settings: Setting[]){
            this._settings = settings;
        }

        public addSettings(settings: Setting[]) {
            this._settings = this._settings.concat(settings);
        }

        public addSetting(setting: Setting) {
            this._settings = this._settings.concat(setting);
        }

        constructor() {
            this._settings = [];
            if (SettingsManager._instance) {
                log("Error: Instantiation failed. Use SettingsManager.Current() instead of new.");
            }
            SettingsManager._instance = this;
        }

        static get Instance() {
            if (!this._instance) {
                this._instance = new SettingsManager();
            }
            return SettingsManager._instance;
        }
    }



}