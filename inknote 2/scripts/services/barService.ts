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

            var previousItem: Model.Bar = null;

            var instruments = Managers.ProjectManager.Instance.currentProject.instruments;
            for (var i = 0; i < instruments.length; i++) {
                for (var j = 0; j < instruments[i].bars.length; j++) {
                    var bar = instruments[i].bars[j];

                    if (bar.ID == ScoringService.Instance.SelectedItem.ID) {
                        if (bar.items.length == 0) {

                            runRemove = true;

                            if (previousItem) {
                                ScoringService.Instance.selectID = previousItem.ID;
                            }
                            else {
                                ScoringService.Instance.selectID = null;
                            }

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

                    previousItem = bar;
                }
            }

            if (runRemove === true) {
                for (var i = 0; i < instruments.length; i++) {

                    instruments[i].bars.splice(removeIndex, 1);

                    ScoringService.Instance.refresh();
                }
            }
        }

        changeBarTimeSignature() {
            
            UndoService.Instance.store();

            var top = prompt("amount of beats in the bar");

            while (~~top == 0) {
                top = prompt("amount of beats in the bar? must be a number greater than 0");
            } 

            var bottom = prompt("length of beat");

            while (~~bottom % 2 != 0 || ~~bottom == 0) {
                bottom = prompt("what is the length of the new beat? this must be a power of 2");
            }

            var barNumber: number = null;

            var currentProject = Managers.ProjectManager.Instance.currentProject;

            for (var i = 0; i < currentProject.instruments.length; i++) {

                var tempInstrument = currentProject.instruments[i];

                for (var j = 0; j < tempInstrument.bars.length; j++) {
                    var tempBar = tempInstrument.bars[j];

                    if (tempBar.ID == ScoringService.Instance.selectID) {
                        barNumber = j;
                    }
                }
            }

            if (barNumber == null) {
                return;
            }

            for (var i = 0; i < currentProject.instruments.length; i++) {

                var tempInstrument = currentProject.instruments[i];

                var tempBar = tempInstrument.bars[barNumber];

                var replaced = false;

                for (var j = 0; j < tempBar.items.length; j++) {
                    if (tempBar.items[j] instanceof Model.TimeSignature) {
                        replaced = true;
                        tempBar.items[j] = new Model.TimeSignature(~~top, ~~bottom);
                    }
                }

                if (replaced == false) {
                    tempBar.items.unshift(new Model.TimeSignature(~~top, ~~bottom));
                }
            }

            ScoringService.Instance.refresh();

        }

        addClef() {

            var currentProject = Managers.ProjectManager.Instance.currentProject;

            if (!ScoringService.Instance.selectID || !(ScoringService.Instance.SelectedItem instanceof Drawing.Bar)) {
            
                var currentInstrument = currentProject.instruments[0];

                if (currentInstrument.bars.length == 0) {
                    NoteControlService.Instance.addBar();
                }

                var currentBar = currentInstrument.bars[currentInstrument.bars.length - 1];

                currentBar.items.push(new Model.TrebleClef());

                ScoringService.Instance.refresh();

                return;    
            }
            
            for (var i = 0; i < currentProject.instruments.length; i++) {
                for (var j = 0; j < currentProject.instruments[i].bars.length; j++) {
                    if (currentProject.instruments[i].bars[j].ID == ScoringService.Instance.selectID) {
                        currentProject.instruments[i].bars[j].items.push(new Model.TrebleClef());
                        ScoringService.Instance.refresh();
                        return;
                    }
                }
            }
        }

        changeKey() {
            // todo: implement this;
            Inknote.log("change key not implemented", MessageType.Error);
        }

    }
}