/// <reference path="defs.ts" />

module Inknote.Plugins {

    var dataStorage = new InknotePlugin("data storage");

    dataStorage.onSave = function () {
        console.log("storage plugin tested");
    }

    Inknote.Managers.PluginManager.Instance.addPlugin(dataStorage);
     
}         