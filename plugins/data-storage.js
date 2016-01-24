var Inknote;
(function (Inknote) {
    var Plugins;
    (function (Plugins) {
    })(Plugins = Inknote.Plugins || (Inknote.Plugins = {}));
})(Inknote || (Inknote = {}));
var Inknote;
(function (Inknote) {
    var Managers;
    (function (Managers) {
        ;
    })(Managers = Inknote.Managers || (Inknote.Managers = {}));
})(Inknote || (Inknote = {}));
/// <reference path="defs.ts" />
var Inknote;
(function (Inknote) {
    var Plugins;
    (function (Plugins) {
        var dataStorage = new Plugins.InknotePlugin("data storage");
        dataStorage.onSave = function () {
            console.log("storage plugin tested");
        };
        Inknote.Managers.PluginManager.Instance.addPlugin(dataStorage);
    })(Plugins = Inknote.Plugins || (Inknote.Plugins = {}));
})(Inknote || (Inknote = {}));
