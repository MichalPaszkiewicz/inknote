module Inknote.Main {

    export var x: any;

    if (typeof document != "undefined") {
        // load setting manager
        var settingsManager = Managers.SettingsManager.Instance;

        var appSetting = new Setting("Default");

        // ***********************************************
        // ** comment out the following lines when live. **
        // appSetting.testMode = true;
        // appSetting.displayID = true;
        // ***********************************************
    
        // ***********************************************
        // *** uncomment the following to test mobile  ***
        // Managers.MachineManager.Instance.machineType = Managers.MachineType.Mobile;
        // ***********************************************

        settingsManager.addSetting(appSetting);
        settingsManager.addSettings(Storage.getSettings());

        // load drawing settings
        var drawing = DrawingSettings.Instance;

        // load project manager
        var projectManager = Managers.ProjectManager.Instance;
        var decompressedProjects = ProjectConverter.decompressAll(Storage.getProjects());
        projectManager.addProjects(decompressedProjects);
        projectManager.openProjectFromURL();

        x = new DrawService("my-canvas");
        var y = new CanvasControl(x);
        
        if(Inknote.Managers.PluginManager){
            var plugins = Inknote.Managers.PluginManager.Instance.plugins.filter(function(plugin: Inknote.Plugins.InknotePlugin){
               return plugin.allowOnAppStart && !!plugin.onAppStart; 
            });
            
            plugins.forEach(function(plugin: Inknote.Plugins.InknotePlugin){
               plugin.onAppStart();
            });
        }
         
    }

}