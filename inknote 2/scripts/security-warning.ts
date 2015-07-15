if (Inknote.Managers.SettingsManager.Current.testMode) {
    console.log("%cWARNING", "color: white; border: 1px solid black; font-size: 40px; padding: 0 10px; background: red; text-shadow: 1px 1px 0 black;");
    console.log("%cthis app is running in test mode", "font-size: 15px; font-family: 'Courier New'");
}
else {
    console.log("%cWARNING", "color: white; border: 1px solid black; font-size: 40px; padding: 0 10px; background: red; text-shadow: 1px 1px 0 black;");
    console.log("%cthis is the developer console", "font-size: 15px; font-family: 'Courier New'");
    console.log("%conly use this if you know what you are doing", "font-size: 15px; font-family: 'Courier New'");
}