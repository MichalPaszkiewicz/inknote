module Inknote {

    export class UndoService {

        private static _instance: UndoService;

        static get Instance(): UndoService {
            if (!UndoService._instance) {
                UndoService._instance = new UndoService();
            }
            return UndoService._instance;
        }

        private _storage: Compressed.CompressedProject[] = [];

        store() {
            var currentProject = Managers.ProjectManager.Instance.currentProject;
            var compressedCurrentProject = ProjectConverter.compress(currentProject);

            this._storage.push(compressedCurrentProject);
            
            while (this._storage.length >= 5) {
                this._storage.shift();
            }
        }

        undo() {

            if (this._storage.length > 0) {

                var decompressedStoredProject = ProjectConverter.decompress(this._storage.pop());

                Managers.ProjectManager.Instance.currentProjectOverride = decompressedStoredProject;

                ScoringService.Instance.refresh();

            }
            else {

                log("You have reached the maximum number of undos", MessageType.Warning);

            }

        }

    }

}