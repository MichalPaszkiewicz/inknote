/// <reference path="../comms.ts" />
module Sanity {

    function toLines(script: string): string[] {

        return script.split("\n");
    }

    export class Session {

        private static _current: Session;

        static get Current(): Session {
            if (!Session._current) {
                Session._current = new Session();
            }
            return Session._current;
        }

        previewID: string;

        scriptLines: string[];

        scriptLineIndex: number;

        editorLines: string[];

        editorLineIndex: number;

        sendLine() {
            var message = new Comms.CommandMessage(this.scriptLines[this.scriptLineIndex], "", "");

            message.send();
        }

        run(script: string) {

            this.scriptLines = toLines(script);
            this.scriptLineIndex = 0;

            this.sendLine();
        }

        onSuccess() {

            this.scriptLineIndex++;

            if (this.scriptLineIndex >= this.scriptLines.length) {
                this.completeSuccess();
            }
            else {
                this.sendLine();
            }

        }

        onFail() {
            this.sendLine();
        }

        completeSuccess() {
            var message = new Comms.SnapshotMessage("")

            message.send();
        }

        constructor() {

        }
    }

    Comms.awaitMessage(function (message, sender) {

        switch (message.messageType) {
            case Comms.MessageType.success:
                Session.Current.onSuccess();
                break;
            case Comms.MessageType.fail:
                Session.Current.onFail();
                break;
        }

    });

}