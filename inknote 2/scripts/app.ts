module Inknote.Main {

    // load setting manager
    var settingsManager = Managers.SettingsManager.Current;

    settingsManager.addSetting(new Setting("Default"));
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