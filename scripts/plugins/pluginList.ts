module Inknote.Plugins {

    var pluginList = [
        new InknotePluginName("snow background", "./plugins/snow-back.js", "covers the background with snow"),
        new InknotePluginName("plugin2", "./plugins/plugin2.js", "testing on draw"),
        new InknotePluginName("data storage", "./plugins/data-storage.js", "testing on save"),
        new InknotePluginName("fire background", "./plugins/fire-bground.js", "covers the background with flames")
    ]

    Inknote.Managers.PluginManager.Instance.addPluginNames(pluginList);

    function getPluginNameFromCompressed(compressed: Plugins.Compressed.InknotePlugin): Plugins.InknotePluginName {

        var result = new Plugins.InknotePluginName(compressed.name, compressed.URL, compressed.description);

        return result;
    }

    var compressedPlugins = Storage.getPlugins();
    for (var i = 0; i < compressedPlugins.length; i++) {
        var decompressed = getPluginNameFromCompressed(compressedPlugins[i]);

        var existing = Inknote.Managers.PluginManager.Instance.findPluginNameByName(decompressed.name);

        if (!existing) {
            Inknote.Managers.PluginManager.Instance.addPluginName(decompressed);
        }

        var plugged = Inknote.Managers.PluginManager.Instance.findPluginNameByName(compressedPlugins[i].name);

        var compressed = compressedPlugins[i];

        plugged.active = compressedPlugins[i].active;
        plugged.allowOnDraw = compressed.allowOnDraw;
        plugged.allowOnSave = compressed.allowOnSave;

    }

    if (typeof document != "undefined"){
        setTimeout(function () {
            Inknote.Managers.PluginManager.Instance.generatePluginHtml();
        }, 300);
    }
} 