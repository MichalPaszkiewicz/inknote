/// <reference path="../scripts/typings/chrome/chrome.d.ts" />

module Sanity.Comms {

    export enum FROM {
        "editor",
        "preview"
    }

    export enum MessageType {
        "snippet", 
        "success",
        "fail",
        "snapshot",
        "startPreview"
    }

    export class Message {

        constructor(public messageType: MessageType, public from: FROM, public to: string, public data: {}, public fromID?: string) {

        }

        send() {
            chrome.runtime.sendMessage(this);
        }
    }

    export class CommandMessage extends Message {

        constructor(snippet: string, baseURL: string, projectID: string) {
            super(MessageType.snippet, FROM.editor, "all",
                {
                    from: "editor-tab",
                    snippet: snippet,
                    baseUrl: baseURL,
                    projectId: projectID
                });
        }
    }

    export class StartPreviewMessage extends Message {

        constructor(scriptHash: string) {
            super(MessageType.startPreview, FROM.editor, "all", {});
        }
    }

    export class SnapshotMessage extends Message {

        constructor(scriptHash: string) {
            super(MessageType.snapshot, FROM.editor, "all", {
                scriptHash: scriptHash
            });
        }
    }

    export class SuccessMessage extends Message {

        constructor() {
            super(MessageType.success, FROM.preview, "", {});
        }
    }

    export class FailMessage extends Message {

        constructor() {
            super(MessageType.fail, FROM.preview, "", {});
        }
    }

    export function awaitMessage(func: (message: Message, sender) => void) {
        chrome.runtime.onMessage.addListener(function (message, sender) {
            func(message, sender);
        });
    }

}