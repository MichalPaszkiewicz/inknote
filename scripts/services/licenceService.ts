module Inknote{

    export class LicenceService{
        private static _instance: LicenceService;
        static get Instance(): LicenceService {
            if (!LicenceService._instance) {
                LicenceService._instance = new LicenceService();
            }
            return LicenceService._instance;
        }

        drawing: Drawing.Licence;

        constructor() {
            this.drawing = new Drawing.Licence();
        }
    }

} 