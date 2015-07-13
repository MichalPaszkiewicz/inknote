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
        var plugin2 = new Plugins.InknotePlugin("plugin2");
        plugin2.onDraw = function (ctx, canvas) {
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 20, 20);
            ctx.fillText("Plugin 2 in use", 60, 20);
        };
        Inknote.Managers.PluginManager.Instance.addPlugin(plugin2);
    })(Plugins = Inknote.Plugins || (Inknote.Plugins = {}));
})(Inknote || (Inknote = {}));
