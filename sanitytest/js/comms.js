/// <reference path="../scripts/typings/chrome/chrome.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Sanity;
(function (Sanity) {
    var Comms;
    (function (Comms) {
        (function (FROM) {
            FROM[FROM["editor"] = 0] = "editor";
            FROM[FROM["preview"] = 1] = "preview";
        })(Comms.FROM || (Comms.FROM = {}));
        var FROM = Comms.FROM;
        (function (MessageType) {
            MessageType[MessageType["snippet"] = 0] = "snippet";
            MessageType[MessageType["success"] = 1] = "success";
            MessageType[MessageType["fail"] = 2] = "fail";
            MessageType[MessageType["snapshot"] = 3] = "snapshot";
            MessageType[MessageType["startPreview"] = 4] = "startPreview";
        })(Comms.MessageType || (Comms.MessageType = {}));
        var MessageType = Comms.MessageType;
        var Message = (function () {
            function Message(messageType, from, to, data, fromID) {
                this.messageType = messageType;
                this.from = from;
                this.to = to;
                this.data = data;
                this.fromID = fromID;
            }
            Message.prototype.send = function () {
                chrome.runtime.sendMessage(this);
            };
            return Message;
        })();
        Comms.Message = Message;
        var CommandMessage = (function (_super) {
            __extends(CommandMessage, _super);
            function CommandMessage(snippet, baseURL, projectID) {
                _super.call(this, 0 /* snippet */, 0 /* editor */, "all", {
                    from: "editor-tab",
                    snippet: snippet,
                    baseUrl: baseURL,
                    projectId: projectID
                });
            }
            return CommandMessage;
        })(Message);
        Comms.CommandMessage = CommandMessage;
        var StartPreviewMessage = (function (_super) {
            __extends(StartPreviewMessage, _super);
            function StartPreviewMessage(scriptHash) {
                _super.call(this, 4 /* startPreview */, 0 /* editor */, "all", {});
            }
            return StartPreviewMessage;
        })(Message);
        Comms.StartPreviewMessage = StartPreviewMessage;
        var SnapshotMessage = (function (_super) {
            __extends(SnapshotMessage, _super);
            function SnapshotMessage(scriptHash) {
                _super.call(this, 3 /* snapshot */, 0 /* editor */, "all", {
                    scriptHash: scriptHash
                });
            }
            return SnapshotMessage;
        })(Message);
        Comms.SnapshotMessage = SnapshotMessage;
        var SuccessMessage = (function (_super) {
            __extends(SuccessMessage, _super);
            function SuccessMessage() {
                _super.call(this, 1 /* success */, 1 /* preview */, "", {});
            }
            return SuccessMessage;
        })(Message);
        Comms.SuccessMessage = SuccessMessage;
        var FailMessage = (function (_super) {
            __extends(FailMessage, _super);
            function FailMessage() {
                _super.call(this, 2 /* fail */, 1 /* preview */, "", {});
            }
            return FailMessage;
        })(Message);
        Comms.FailMessage = FailMessage;
        function awaitMessage(func) {
            chrome.runtime.onMessage.addListener(function (message, sender) {
                func(message, sender);
            });
        }
        Comms.awaitMessage = awaitMessage;
    })(Comms = Sanity.Comms || (Sanity.Comms = {}));
})(Sanity || (Sanity = {}));
