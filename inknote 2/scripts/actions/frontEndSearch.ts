module FrontEnd.SmartSearch {

    function generateSearchResults(results: Inknote.SmartSearchResult[]) {

        var container = document.getElementById("smart-search-output");

        container.innerHTML = "";

        var title = document.createElement("h2");
        title.textContent = "results";

        container.appendChild(title);

        if (results.length == 0) {
            var resultsText = document.createElement("p");

            resultsText.textContent = "no results found";

            container.appendChild(resultsText);

            return;
        }

        var headerDiv = document.createElement("div");

        var col1 = document.createElement("span");
        col1.textContent = "project";
        
        var col2 = document.createElement("span");
        col2.textContent = "instr";

        var col3 = document.createElement("span");
        col3.textContent = "bar";

        var col4 = document.createElement("span");
        col4.textContent = "item";

        headerDiv.appendChild(col1);
        headerDiv.appendChild(col2);
        headerDiv.appendChild(col3);
        headerDiv.appendChild(col4);

        container.appendChild(headerDiv);

        for (var i = 0; i < results.length; i++) {
            var resultDiv = document.createElement("div");
            
            var resCol1 = document.createElement("span");
            resCol1.textContent = results[i].projectIndex + "";

            var resCol2 = document.createElement("span");
            resCol2.textContent = results[i].instrumentIndex + "";

            var resCol3 = document.createElement("span");
            resCol3.textContent = results[i].barIndex + "";

            var resCol4 = document.createElement("span");
            resCol4.textContent = results[i].itemIndex + "";

            resultDiv.appendChild(resCol1);
            resultDiv.appendChild(resCol2);
            resultDiv.appendChild(resCol3);
            resultDiv.appendChild(resCol4);

            var proj = Inknote.Managers.ProjectManager.Instance.allProjects[results[i].projectIndex];
            var instr = proj.instruments[results[i].instrumentIndex];
            var bar = instr.bars[results[i].barIndex];

            var idToSet = "";

            if (results[i].itemIndex == null) {
                idToSet = bar.ID;
            }
            else {
                idToSet = bar.items[results[i].itemIndex].ID;
            }

            resultDiv.setAttribute("data-id", idToSet);
            resultDiv.setAttribute("data-proj", proj.ID);

            for (var j = 0; j < resultDiv.childNodes.length; j++) {
                var tempSpan = <HTMLSpanElement>resultDiv.childNodes[j];

                tempSpan.setAttribute("data-proj", proj.ID);
                tempSpan.setAttribute("data-id", idToSet);
            }

            resultDiv.onclick = function (e) {
                var targetItem = <HTMLDivElement>e.target;

                var projID = targetItem.getAttribute("data-proj");

                if (projID != Inknote.Managers.ProjectManager.Instance.currentProject.ID) {
                    Inknote.Managers.ProjectManager.Instance.openProjectFromID(projID);
                }

                if (Inknote.Managers.PageManager.Current.page != Inknote.Managers.Page.Score) {
                    Inknote.Managers.PageManager.Current.page = Inknote.Managers.Page.Score;
                }

                var targetID = targetItem.getAttribute("data-id");

                Inknote.GoToService.Instance.goToID(targetID);

                FrontEnd.SmartSearch.closeSearch();
            }

            container.appendChild(resultDiv);
        }

    }

    export function search(){

        var text = (<HTMLInputElement>document.getElementById("smart-search-text")).value;

        var results = Inknote.SmartSearchService.Instance.findText(text);

        generateSearchResults(results);

    }

    export function openSearch() {
        var searchContainer = document.getElementById("smart-search");

        FrontEnd.showElement(searchContainer);
    }

    export function closeSearch() {
        var searchContainer = document.getElementById("smart-search");

        FrontEnd.hideElement(searchContainer);
    }

} 