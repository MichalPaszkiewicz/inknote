/******** 
    * IMPORTANT: THE ORDER OF ITEMS IN THIS LIST IS IMPORTANT FOR SANITY GRAMMAR PROCESSING. RE-ORDER WITH CARE 
    *********/
function sanityLanguage() { }

sanityLanguage.today = function () {
    return (new Date()).getDate() + "-" + ((new Date()).getMonth() + 1) + "-" + (new Date()).getFullYear();
};

sanityLanguage.commands = {};

sanityLanguage.commands["click"] = { name: "click", recursive: false, targeting: true, snippet: false, append: "", preview: true };
sanityLanguage.commands["set"] = { name: "set", recursive: false, targeting: true, snippet: false, append: "", preview: true };
sanityLanguage.commands["go to"] = { name: "go to", recursive: false, targeting: false, snippet: false, append: " \"/\"", preview: false };
sanityLanguage.commands["wait"] = { name: "wait", recursive: false, targeting: false, snippet: false, append: " 0.5s", preview: false };
sanityLanguage.commands["login as"] = { name: "login as", recursive: false, targeting: false, snippet: true, append: "", preview: false };
sanityLanguage.commands["logout"] = { name: "logout", recursive: false, targeting: false, snippet: false, append: "", preview: false };
sanityLanguage.commands["refresh page"] = { name: "refresh page", recursive: false, targeting: false, snippet: false, append: "", preview: false };
sanityLanguage.commands["check mailbox"] = { name: "check mailbox", recursive: false, targeting: false, snippet: false, append: " \"name@mail.com\"", preview: false };
sanityLanguage.commands["assume date"] = { name: "assume date", recursive: false, targeting: false, snippet: false, append: " " + sanityLanguage.today(), preview: false };
sanityLanguage.commands["assume time"] = { name: "assume time", recursive: false, targeting: false, snippet: false, append: " 14:30", preview: false };
sanityLanguage.commands["run test"] = { name: "run test", recursive: false, targeting: false, snippet: true, append: "", preview: false };
sanityLanguage.commands["do:"] = { name: "do:", recursive: false, snippet: true, targeting: false, append: "", preview: false };
sanityLanguage.commands["javascript:"] = { name: "javascript:", recursive: false, snippet: false, targeting: false, append: " alert('Hello');", preview: false };

//sanityLanguage.commands["switch to new window"] = { name: "switch to new window", recursive: false, targeting: false, snippet: false, append: "", preview: false };
//sanityLanguage.commands["return to previous window"] = { name: "return to previous window", recursive: false, targeting: false, snippet: false, append: "", preview: false };

sanityLanguage.commands["at row"] = { name: "at row", recursive: true, targeting: true, snippet: false, append: " \"text\"", preview: true };

sanityLanguage.commands["above button"] = { name: "above button", recursive: true, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["above field"] = { name: "above field", recursive: true, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["above header"] = { name: "above header", recursive: true, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["above"] = { name: "above", recursive: true, targeting: true, snippet: false, append: " \"text\"", preview: true };

sanityLanguage.commands["below button"] = { name: "below button", recursive: true, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["below field"] = { name: "below field", recursive: true, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["below header"] = { name: "below header", recursive: true, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["below"] = { name: "below", recursive: true, targeting: true, snippet: false, append: " \"text\"", preview: true };

sanityLanguage.commands["near button"] = { name: "near button", recursive: true, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["near field"] = { name: "near field", recursive: true, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["near header"] = { name: "near header", recursive: true, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["near"] = { name: "near", recursive: true, targeting: true, snippet: false, append: " \"text\"", preview: true };

sanityLanguage.commands["expect no button"] = { name: "expect no button", recursive: false, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["expect no field"] = { name: "expect no field", recursive: false, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["expect no header"] = { name: "expect no header", recursive: false, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["expect no row"] = { name: "expect no row", recursive: false, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["expect no"] = { name: "expect no", recursive: false, snippet: false, targeting: true, append: " \"text\"", preview: true };

sanityLanguage.commands["expect button"] = { name: "expect button", recursive: false, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["expect field"] = { name: "expect field", recursive: false, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["expect header"] = { name: "expect header", recursive: false, targeting: true, snippet: false, append: " \"text\"", preview: true };
sanityLanguage.commands["expect row"] = { name: "expect row", recursive: false, targeting: true, snippet: false, append: " \"text\"", preview: true };

sanityLanguage.commands["expect url"] = { name: "expect url", recursive: false, targeting: false, snippet: false, append: " \"url\"", preview: false };

sanityLanguage.commands["expect"] = { name: "expect", recursive: false, snippet: false, targeting: true, append: " \"text\"", preview: true };