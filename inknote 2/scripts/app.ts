module Inknote.Main {

    // load setting manager
    var settingsManager = Managers.SettingsManager.Instance;

    var appSetting = new Setting("Default");
    // comment out the following line when live.
    appSetting.testMode = true;

    settingsManager.addSetting(appSetting);
    settingsManager.addSettings(Storage.getSettings());

    // load drawing settings
    var drawing = DrawingSettings.Instance;

    // load project manager
    var projectManager = Managers.ProjectManager.Instance;
    var decompressedProjects = ProjectConverter.decompressAll( Storage.getProjects() );
    projectManager.addProjects(decompressedProjects);

    var x = new DrawService("my-canvas");
    var y = new CanvasControl(x);
}