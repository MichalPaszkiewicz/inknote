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
var Inknote;
(function (Inknote) {
    var Plugins;
    (function (Plugins) {
        var plugin1 = new Plugins.InknotePlugin("plugin1");
        plugin1.onDraw = function (ctx, canvas) {
        };
        plugin1.onSave = function () {
        };
        Inknote.Managers.PluginManager.Instance.addPlugin(plugin1);
    })(Plugins = Inknote.Plugins || (Inknote.Plugins = {}));
})(Inknote || (Inknote = {}));
