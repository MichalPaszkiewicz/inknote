module Inknote {

    export class ProjectOptionsService {

        private static _instance: ProjectOptionsService;

        static get Instance(): ProjectOptionsService {
            if (!ProjectOptionsService._instance) {
                ProjectOptionsService._instance = new ProjectOptionsService();
            }
            return ProjectOptionsService._instance;
        }

        currentProject: Project = null;
        container: HTMLDivElement = <HTMLDivElement>document.getElementById("project-options-details");

        addRowWithData(label: string, startValue: any, onChange: (e: MouseEvent) => void): void {

            var formRow = document.createElement("div");
            formRow.className = "form-row";

            var rowLabel = document.createElement("span");
            rowLabel.className = "label";
            rowLabel.textContent = label;
            
            formRow.appendChild(rowLabel);

            var rowInput = document.createElement("input");
            rowInput.value = startValue;
            rowInput.onchange = onChange;

            formRow.appendChild(rowInput);

            this.container.appendChild(formRow);
        }

        open(project: Project) {
            this.currentProject = project;

            this.container.innerHTML = "";

            var header = document.createElement("h1");
            header.textContent = project.name;
            this.container.appendChild(header);

            var colourRow = document.createElement("div");
            colourRow.className = "form-row";

            var colourLabel = document.createElement("span");
            colourLabel.className = "label";
            colourLabel.textContent = "tag colour:";
            colourRow.appendChild(colourLabel);
            var colour = document.createElement("input");
            colour.type = "color";
            colour.value = project.colour;
            colour.onchange = function (e) {
                ProjectOptionsService.Instance.currentProject.colour = colour.value;
            }
            colourRow.appendChild(colour);

            this.container.appendChild(colourRow);

            this.addRowWithData("composed by:", project.composer, function (e) {
                ProjectOptionsService.Instance.currentProject.composer = (<HTMLInputElement>e.target).value;
            });

            this.addRowWithData("arranged by:", project.arrangedBy, function (e) {
                ProjectOptionsService.Instance.currentProject.arrangedBy = (<HTMLInputElement>e.target).value;
            });

            this.addRowWithData("notes:", project.notes, function (e) {
                ProjectOptionsService.Instance.currentProject.notes = (<HTMLInputElement>e.target).value;
            });

            Modal.toggle("project-options");
        }

        constructor() {

        }

    }

}