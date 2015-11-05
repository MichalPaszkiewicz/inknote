module Inknote {

    export class ClipboardService {

        private static _instance: ClipboardService;

        static get Instance(): ClipboardService {
            if (!ClipboardService._instance) {
                ClipboardService._instance = new ClipboardService();
            }

            return ClipboardService._instance;
        }

        private clipboard: (Model.Bar | Model.TimeSignature | Model.Clef | Model.Chord | Model.Note | Model.Rest | Model.Text)[];

        copyItem(item: Model.TimeSignature | Model.Clef | Model.Chord | Model.Note | Model.Rest | Model.Text): Model.TimeSignature | Model.Clef | Model.Chord | Model.Note | Model.Rest | Model.Text {

            var result = null;

            if (item instanceof Model.Note) {
                return getNoteOfDistance(item, 0);
            }

            if (item instanceof Model.Rest) {
                return new Model.Rest(item.length);
            }

            if (item instanceof Model.Text) {
                return new Model.Text(item.content);
            }

            return result;
        }

        copyDrawItem(selectedItem: IDrawable): Model.TimeSignature | Model.Clef | Model.Chord | Model.Note | Model.Rest | Model.Text {

            var result = null;

            var project = Managers.ProjectManager.Instance.currentProject;
            
            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    var tempBar = project.instruments[i].bars[j];

                    for (var k = 0; k < tempBar.items.length; k++) {
                        var tempItem = project.instruments[i].bars[j].items[k];

                        if (tempItem.ID == selectedItem.ID) {
                            return this.copyItem(tempItem);
                        }

                    }
                }
            }            

            return result;
        }

        copy() {
            this.clipboard = [];

            var selectedItem = ScoringService.Instance.SelectedItem;

            if (selectedItem instanceof Drawing.Bar) {
                var bar = new Model.Bar();

                var project = Managers.ProjectManager.Instance.currentProject;

                var selectedBar: Model.Bar = null;

                for (var i = 0; i < project.instruments.length; i++) {
                    selectedBar = <Model.Bar>getItemFromID(project.instruments[i].bars, selectedItem.ID);

                    if (selectedBar != null) {
                        break;
                    }
                }

                for (var i = 0; i < selectedBar.items.length; i++) {
                    var tempItem = this.copyItem(selectedBar.items[i]);

                    if (tempItem) {
                        bar.items.push(tempItem);
                    }
                }

                this.clipboard.push(bar);

                return;
            }
            else {
                this.clipboard.push(this.copyDrawItem(selectedItem));

                return;
            }

        }

        cut() {
            this.copy();

            NoteControlService.Instance.deleteSelected();
        }

        pasteItem(item: Model.Bar | Model.TimeSignature | Model.Clef | Model.Chord | Model.Note | Model.Rest | Model.Text) {

            var selectedItem = ScoringService.Instance.SelectedItem;

            if (ScoringService.Instance.SelectedItem instanceof Drawing.Bar) {

                var project = Managers.ProjectManager.Instance.currentProject;

                var selectedBar: Model.Bar = null;

                for (var i = 0; i < project.instruments.length; i++) {
                    selectedBar = <Model.Bar>getItemFromID(project.instruments[i].bars, selectedItem.ID);

                    if (selectedBar != null) {
                        break;
                    }
                }

                selectedBar.items = [];

                if (item instanceof Model.Bar) {

                    for (var i = 0; i < item.items.length; i++) {
                        selectedBar.items.push(this.copyItem(item.items[i]));
                    }

                }

            }



        }

        paste() {

            UndoService.Instance.store();

            for (var i = 0; i < this.clipboard.length; i++) {

                this.pasteItem(this.clipboard[i]);

            }

            ScoringService.Instance.refresh();
            
        }

    }

} 