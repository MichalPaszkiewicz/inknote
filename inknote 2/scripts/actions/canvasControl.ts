module Inknote {

    export class CanvasControl{

        hover(e: MouseEvent) {
            var allItems = this.drawService.items;
            var hovered = false;

            for (var i = 0; i < allItems.length; i++) {
                if (mouseIsOver(allItems[i], e, this.drawService.canvas)) {
                    //console.log(allItems[i].y + ":" + e.clientY + ":" + ScrollService.Instance.y);

                    var hoverID = allItems[i].ID;
                    Managers.ProjectManager.Instance.hoverID = hoverID;
                    hovered = true;
                    this.drawService.canvas.style.cursor = "pointer";
                }
            }

            if (!hovered) {
                Managers.ProjectManager.Instance.hoverID = null;
                this.drawService.canvas.style.cursor = "";
            }
        }

        click(e: MouseEvent) {
            var allItems = this.drawService.items;
            var selected = false;

            for (var i = 0; i < allItems.length; i++) {
                if (mouseIsOver(allItems[i], e, this.drawService.canvas)){
                    var selectedID = allItems[i].ID;

                    // if keyboard clicked, do keyboard action.
                    if (selectedID == Keyboard.Instance.ID) {
                        Keyboard.Instance.click(e);
                        return;
                    }

                    if (selectedID == BottomMenu.Instance.ID) {
                        BottomMenu.Instance.click(e);
                        return;
                    }

                    Managers.ProjectManager.Instance.selectID = selectedID;
                    selected = true;
                }
            }

            if (!selected) {
                Managers.ProjectManager.Instance.selectID = null;
            }
        }

        dblClick(e: MouseEvent) {


        }

        constructor(public drawService: DrawService){

            var self = this;

            this.drawService.canvas.onmouseover = function (e: MouseEvent) {
                self.drawService.canvas.onmousemove = function (me: MouseEvent) {
                    self.hover(me);
                }
            }
             
            this.drawService.canvas.onmouseout = function (e: MouseEvent) {
                self.drawService.canvas.onmousemove = null;
            }

            this.drawService.canvas.onclick = function (e: MouseEvent) {
                self.click(e);
            }

            this.drawService.canvas.ondblclick = function (e: MouseEvent) {
                self.dblClick(e);
            }

        }

    }

}