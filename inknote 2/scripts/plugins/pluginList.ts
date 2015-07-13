module Inknote.Plugins {

    var pluginList = [
        new InknotePluginName("plugin1",      "./scripts/plugins/instances/plugin1.js", "testing event list"),
        new InknotePluginName("plugin2",      "./scripts/plugins/instances/plugin2.js", "testing on draw"),
        new InknotePluginName("data storage", "./scripts/plugins/instances/data-storage.js", "testing on save")
    ]

    Inknote.Managers.PluginManager.Instance.addPluginNames(pluginList);

} 