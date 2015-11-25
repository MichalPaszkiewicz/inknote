module FrontEnd.SmartSearch {
    
    var musicSearchNotes: Inknote.IDrawable[] = [];

    function drawMusicSearch() {
        var canvas = <HTMLCanvasElement>document.getElementById("smart-search-canvas");

        canvas.width = 214;
        canvas.height = 80;

        var context = canvas.getContext("2d");

        context.beginPath();
        for (var i = 0; i < 5; i++) {
            context.moveTo(0, i * 10 + 20);
            context.lineTo(214, i * 10 + 20);

        }
        context.strokeStyle = Inknote.Drawing.Colours.black;
        context.stroke();

        var clef = new Inknote.Drawing.GClef(0);

        clef.x = 20;
        clef.y = 50;

        clef.draw(context);

        for (var i = 0; i < musicSearchNotes.length; i++) {
            musicSearchNotes[i].draw(context, canvas);
        }

    }

    function generateSearchResults(results: Inknote.SmartSearchResult[]) {

        var container = document.getElementById("smart-search-output");

        container.innerHTML = "";

        var title = document.createElement("h3");
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

    function getModelledNoteFromDrawingNote(note: Inknote.Drawing.Note): Inknote.Model.Note {
        var clef = new Inknote.Model.TrebleClef();

        var heightFromTopLine = note.y - 15;

        var dif = clef.positionFromTreble;
        var distRound5 = Math.round(heightFromTopLine / 5);
        var topNoteOnTreble = new Inknote.Model.Note(Inknote.Model.NoteValue.F, 5, Inknote.Model.NoteLength.Crotchet);

        var result = Inknote.getNoteFromStaveDifference(topNoteOnTreble, dif - distRound5);
         
        return result;
    }

    function getModelledMusicSearchItems(): (Inknote.Model.Note | Inknote.Model.Rest)[] {
        var results = [];

        for (var i = 0; i < musicSearchNotes.length; i++) {
            results.push(getModelledNoteFromDrawingNote(<Inknote.Drawing.Note>musicSearchNotes[i]));
        }

        return results;
    }

    export function search() {

        var text = (<HTMLInputElement>document.getElementById("smart-search-text")).value;

        var musicSearchItems = getModelledMusicSearchItems();

        var results = Inknote.SmartSearchService.Instance.findByTextAndMusic(text, musicSearchItems);

        generateSearchResults(results);

    }

    export function openSearch() {
        var searchContainer = document.getElementById("smart-search");

        FrontEnd.showElement(searchContainer);

        drawMusicSearch();
    }

    export function closeSearch() {
        var searchContainer = document.getElementById("smart-search");

        FrontEnd.hideElement(searchContainer);
    }

    export function clearSearch() {
        var searchText = <HTMLInputElement>document.getElementById("smart-search-text");
        searchText.value = "";
        var container = document.getElementById("smart-search-output");
        container.innerHTML = "";
        musicSearchNotes = [];
        drawMusicSearch();
    }

    function addItemToMusicSearch(e: MouseEvent) {

        if (musicSearchNotes.length >= 10) {
            Inknote.log("cannot search for a series of notes longer than 10", Inknote.MessageType.Warning);
            return;
        }
        
        var hPos = 5 * Math.round(e.offsetY / 5);
        var xPos = musicSearchNotes.length * 15 + 40;
        
        var newNote = new Inknote.Drawing.Crotchet(hPos > 35);
        newNote.x = xPos;
        newNote.y = hPos;

        musicSearchNotes.push(newNote);

        drawMusicSearch();
    }

    if (typeof (document) != typeof (undefined)) {
        var smartSearchCanvas = document.getElementById("smart-search-canvas");

        smartSearchCanvas.onclick = addItemToMusicSearch;
    }

} 