/// <reference path="../comms.ts" />
var Sanity;
(function (Sanity) {
    function toLines(script) {
        return script.split("\n");
    }
    var Session = (function () {
        function Session() {
        }
        Object.defineProperty(Session, "Current", {
            get: function () {
                if (!Session._current) {
                    Session._current = new Session();
                }
                return Session._current;
            },
            enumerable: true,
            configurable: true
        });
        Session.prototype.sendLine = function () {
            var message = new Sanity.Comms.CommandMessage(this.scriptLines[this.scriptLineIndex], "", "");
            message.send();
        };
        Session.prototype.run = function (script) {
            this.scriptLines = toLines(script);
            this.scriptLineIndex = 0;
            this.sendLine();
        };
        Session.prototype.onSuccess = function () {
            this.scriptLineIndex++;
            if (this.scriptLineIndex >= this.scriptLines.length) {
                this.completeSuccess();
            }
            else {
                this.sendLine();
            }
        };
        Session.prototype.onFail = function () {
            this.sendLine();
        };
        Session.prototype.completeSuccess = function () {
            var message = new Sanity.Comms.SnapshotMessage("");
            message.send();
        };
        return Session;
    })();
    Sanity.Session = Session;
    Sanity.Comms.awaitMessage(function (message, sender) {
        switch (message.messageType) {
            case Sanity.Comms.MessageType.success:
                Session.Current.onSuccess();
                break;
            case Sanity.Comms.MessageType.fail:
                Session.Current.onFail();
                break;
        }
    });
})(Sanity || (Sanity = {}));
