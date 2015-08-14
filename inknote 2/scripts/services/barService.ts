module Inknote {

    export class BarService {

        private static _instance: BarService;

        static get Instance() {
            if (!BarService._instance) {
                BarService._instance = new BarService();
            }
            return BarService._instance;
        }

        deleteSelectedBar() {
            var runRemove = false;
            var removeIndex = 0;

            var instruments = Managers.ProjectManager.Instance.currentProject.instruments;
            for (var i = 0; i < instruments.length; i++) {
                for (var j = 0; j < instruments[i].bars.length; j++) {
                    var bar = instruments[i].bars[j];

                    if (bar.ID == ScoringService.Instance.SelectedItem.ID) {
                        if (bar.items.length == 0) {

                            runRemove = true;

                            // do not run remove if any items in any parallel bars
                            for (var k = 0; k < instruments.length; k++) {
                                if (instruments[k].bars[j].items.length > 0) {
                                    runRemove = false;
                                }
                            }

                            if (runRemove == true) {
                                removeIndex = j;
                            }
                        }
                        else {
                            bar.items = [];
                            ScoringService.Instance.refresh();
                        }
                        break;
                    }
                }
            }

            if (runRemove === true) {
                console.log("here");
                for (var i = 0; i < instruments.length; i++) {

                    instruments[i].bars.splice(removeIndex, 1);

                    ScoringService.Instance.refresh();
                }
            }
        }

    }
}