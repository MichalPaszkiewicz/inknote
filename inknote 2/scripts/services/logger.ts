module Inknote {

    export enum MessageType {
        Error,
        Text,
        Warning
    }

    export function log(message: string, msgType?: MessageType) {
        if (msgType == MessageType.Error) {
            console.log("%c" + message, "color:red");
        }
        else if (msgType == MessageType.Warning){
            console.log("%c" + message, "color: orange");
        }
        else {
            console.log(message);
        }
    }

}