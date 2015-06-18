module Inknote {

    export enum MessageType {
        Error,
        Text
    }

    export function log(message: string, msgType?: MessageType) {
        console.log(message);
    }

}