module Inknote {

    export class InstrumentService {

        private static _instance: InstrumentService;

        static get Instance(): InstrumentService {
            if (!InstrumentService._instance) {
                InstrumentService._instance = new InstrumentService();
            }
            return InstrumentService._instance;
        }

        moveUpFromID(id: string) {
            var proj = Managers.ProjectManager.Instance.currentProject;

            var newInstruments = [];

            for (var j = 0; j < proj.instruments.length; j++) {
                if (proj.instruments[j + 1] && proj.instruments[j + 1].ID == id) {
                    newInstruments.push(proj.instruments[j + 1]);
                    newInstruments.push(proj.instruments[j]);
                    j++;
                }
                else {
                    newInstruments.push(proj.instruments[j]);
                }
            }

            proj.instruments = newInstruments;
            ScoringService.Instance.refresh();
        }

        moveDownFromID(id: string) {
            var proj = Managers.ProjectManager.Instance.currentProject;

            var newInstruments = [];

            for (var j = 0; j < proj.instruments.length; j++) {
                if (proj.instruments[j].ID == id && proj.instruments[j + 1]) {
                    newInstruments.push(proj.instruments[j + 1]);
                    newInstruments.push(proj.instruments[j]);
                    j++;
                }
                else {
                    newInstruments.push(proj.instruments[j]);
                }
            }

            proj.instruments = newInstruments;
            ScoringService.Instance.refresh();
        }
    
        deleteFromID(id: string, then?: () => void) {
            check("Are you sure you want to delete this instrument?", function () {
                var proj = Managers.ProjectManager.Instance.currentProject;

                var newInstruments = [];

                for (var j = 0; j < proj.instruments.length; j++) {
                    if (proj.instruments[j].ID != id){
                        newInstruments.push(proj.instruments[j]);
                    }
                }

                proj.instruments = newInstruments;

                then();

                ScoringService.Instance.refresh();
            });
        }

    }

}