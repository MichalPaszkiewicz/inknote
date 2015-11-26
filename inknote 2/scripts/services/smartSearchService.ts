module Inknote {

    export class SmartSearchResult {
        projectIndex: number;
        instrumentIndex: number;
        barIndex: number;
        itemIndex: number;

        constructor(projectIndex: number, instrumentIndex: number, barIndex: number, itemIndex: number) {
            this.projectIndex = projectIndex;
            this.instrumentIndex = instrumentIndex;
            this.barIndex = barIndex;
            this.itemIndex = itemIndex;
        }        
    }

    export enum SearchRange {
        CURRENT_PROJECT,
        ALL_PROJECTS
    }

    export class SmartSearchSettings {
        get searchRange(): SearchRange {
            if (Managers.PageManager.Current.page == Managers.Page.Score) {
                return SearchRange.CURRENT_PROJECT;
            }

            return SearchRange.ALL_PROJECTS;
        }
    }

    export class SmartSearchService{

        private static _instance: SmartSearchService;

        static get Instance(): SmartSearchService {
            if (!SmartSearchService._instance) {
                SmartSearchService._instance = new SmartSearchService();
            }
            return SmartSearchService._instance;
        }

        settings: SmartSearchSettings = new SmartSearchSettings();  

        find() {

        }

        findByTextAndMusic(text: string, music: (Model.Note | Model.Rest)[]): SmartSearchResult[] {

            var textResults: SmartSearchResult[] = [];
            var musicResults: SmartSearchResult[] = [];

            if (text == null || text == "") {
                return this.findMusic(music);
            }
            
            if (music == null || music.length == 0) {
                return this.findText(text);
            }

            textResults = this.findText(text);
            musicResults = this.findMusic(music);

            var finalResults: SmartSearchResult[] = [];

            for (var i = 0; i < musicResults.length; i++) {
                if (anyItemIs(textResults, function (item: SmartSearchResult) {
                    var sameProject = musicResults[i].projectIndex == item.projectIndex;
                    var sameInstrument = musicResults[i].instrumentIndex == item.instrumentIndex;
                    var sameBar = musicResults[i].barIndex == item.barIndex;
                    var similarIndex = musicResults[i].itemIndex == item.itemIndex - 1;

                    return sameProject && sameInstrument && sameBar;
                })) {
                    finalResults.push(musicResults[i]);
                }
            }

            return finalResults;

        }

        findTextInProject(text: string, project: Project): SmartSearchResult[] {

            var results: SmartSearchResult[] = [];

            var projectIndex = getIndexFromID(Managers.ProjectManager.Instance.allProjects, project.ID);

            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    for (var k = 0; k < project.instruments[i].bars[j].items.length; k++) {
                        var tempItem = project.instruments[i].bars[j].items[k];

                        if (tempItem instanceof Model.Text) {
                            if (tempItem.content.indexOf(text) != -1) {
                                results.push(new SmartSearchResult(projectIndex, i, j, k));
                            }
                        }
                    }
                }
            }

            return results;
        }

        findText(text: string): SmartSearchResult[] {

            var results: SmartSearchResult[] = [];

            if (this.settings.searchRange == SearchRange.ALL_PROJECTS) {
                var projects = Managers.ProjectManager.Instance.allProjects;

                for (var i = 0; i < projects.length; i++) {
                    results = results.concat(this.findTextInProject(text, projects[i]));
                }
            }
            else {
                results = this.findTextInProject(text, Managers.ProjectManager.Instance.currentProject);
            }

            return results;
        }

        musicMatchesWithBar(music: (Model.Note | Model.Rest)[], bar: Model.Bar): boolean {
            var musicIndex = 0;
            var barIndex = 0;

            if (music.length > bar.items.length) {
                return false;
            }

            while (musicIndex < music.length && barIndex < bar.items.length) {

                if (bar.items[barIndex] instanceof Model.Note
                    || bar.items[barIndex] instanceof Model.Rest) {

                    if (bar.items[barIndex] instanceof Model.Note) {
                        var barNote = <Model.Note>bar.items[barIndex];
                        
                        if (music[musicIndex] instanceof Model.Rest) {
                            return false;
                        }
                        
                        var musicNote = <Model.Note>music[musicIndex];

                        // with notes, not necessarily going for specific rhythm
                        if (musicNote.value != barNote.value) {
                            return false;
                        }
                    }
                    else {
                        var barRest = <Model.Rest>bar.items[barIndex];

                        if (music[musicIndex] instanceof Model.Note) {
                            return false;
                        }

                        var musicRest = <Model.Rest>music[musicIndex];

                        // with rests, can only be going for length.
                        if (musicRest.length != barRest.length) {
                            return false;
                        }
                    }

                    musicIndex++;
                }
                else {
                }

                barIndex++;

            }

            return true;
        }

        findMusicInProject(music: (Model.Note | Model.Rest)[], project: Project): SmartSearchResult[] {

            var results: SmartSearchResult[] = [];
            
            var projectIndex = getIndexFromID(Managers.ProjectManager.Instance.allProjects, project.ID);

            for (var i = 0; i < project.instruments.length; i++) {
                for (var j = 0; j < project.instruments[i].bars.length; j++) {
                    if (this.musicMatchesWithBar(music, project.instruments[i].bars[j])) {
                        results.push(new SmartSearchResult(projectIndex, i, j, 0));
                    }
                }
            }

            return results;
        }

        findMusic(music: (Model.Note | Model.Rest)[]): SmartSearchResult[] {
            var results: SmartSearchResult[] = [];

            if (this.settings.searchRange == SearchRange.ALL_PROJECTS) {
                var projects = Managers.ProjectManager.Instance.allProjects;

                for (var i = 0; i < projects.length; i++) {
                    results = results.concat(this.findMusicInProject(music, projects[i]));
                }
            }
            else {
                results = this.findMusicInProject(music, Managers.ProjectManager.Instance.currentProject);
            }

            return results;
        }

    }

}