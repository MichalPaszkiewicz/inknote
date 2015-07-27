﻿module Inknote.Storage {

    document.body.ondrag = function (e) {
        //e.preventDefault();
        return false;
    }

    document.body.ondrop = function (e) {
        e.preventDefault();

        var files = e.dataTransfer.files;

        var blah = e.dataTransfer.getData("utf8");

        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            var reader = new FileReader();

            reader.onload = function (e) {
                console.log(e.target);
                log("loaded");

                var thisFile = file;

                var fileText = (<FileReader>e.target).result;

                if (thisFile.name.indexOf(".score") == -1) {
                    log("incorrect file type", MessageType.Error);
                }
                else {
                    try {
                        var innerScore = JSON.parse(fileText);

                        var decompressedInnerScore = ProjectConverter.decompress(innerScore);

                        Managers.ProjectManager.Instance.addProject(decompressedInnerScore, function (item: Project) {
                            Managers.ProjectManager.Instance.setCurrentProject(item.ID);
                        });
                    }
                    catch (e) {
                        log("incorrect file format", MessageType.Error);
                    }
                }
            }
            
            reader.readAsText(file);
        }

        return false;
    }

    document.body.ondragend = function (e) {
        e.preventDefault();

        return false;
    }

    document.body.ondragstart = function (e) {
        e.preventDefault();

        return false;
    }

    document.body.ondragover = function (e) {
        e.preventDefault();

        return false;
    }

    document.body.ondragleave = function (e) {
        e.preventDefault();
        return false;
    }

    export function download(filename: string, text: string) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
} 