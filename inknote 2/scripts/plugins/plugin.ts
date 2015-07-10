module Inknote.Plugins {

    export class InknotePluginName{

    }

    export class InknotePlugin implements IIdentifiable{
        ID = getID();
        
        constructor(public name: string) {

        }
    }

} 