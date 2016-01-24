module Inknote {

    export class PrintService {

        private static _instance: PrintService;

        static get Instance(): PrintService{
            if (!PrintService._instance) {
                PrintService._instance = new PrintService();
            }
            return PrintService._instance;
        }

        print() {
            check("open printable version?", function () {
                var currentProject = Managers.ProjectManager.Instance.currentProject;

                var newPage = <Window>Managers.PageManager.Current.openNewPage(Managers.Page.Print, currentProject.ID);

                var htmlPage = document.createElement("html");
                var body = document.createElement("body");
                htmlPage.appendChild(body);
                var container = document.createElement("div");
                container.id = "main";
                body.appendChild(container);
                var title = document.createElement("h1");
                title.textContent = currentProject.name;
                container.appendChild(title);


                newPage.document.write(htmlPage.outerHTML);
                newPage.document.title = "print " + currentProject.name;

                var main = newPage.document.getElementById("main");
                var canvas = document.createElement("canvas");
                main.appendChild(canvas);

                var context = canvas.getContext("2d");

                canvas.width = DrawService.Instance.canvas.width;

                var items = ScoringService.Instance.getPrintItems();

                canvas.height = maxOutOf(items, function (item: IDrawable) {
                    return item.y;
                }) + 100;

                for(var i = 0; i < items.length; i++) {
                    items[i].draw(context, canvas, 1);
                }

            },
                function () {
                    log("print cancelled");
                });
        }
    }

} 