/*todo: in future, this file will hold many arrays of user defined functions. The user will be able to add functions to the arrays to, for example, save data to their own database on save, etc. */

var userFunctions = {};

userFunctions.wakeUpCalls = [];
userFunctions.afterSave = [];

function getLocalUserFunctions(){
	return tempUserFunctions = JSON.parse(localStorage.getItem("inknote-userfunctions"));
}

function addUserFunctionsFromJSON(JSONitem){
	if(JSONitem && JSONitem.wakeUpCalls){
		for(var i = 0; i < JSONitem.wakeUpCalls.length){
			userFunctions.wakeUpCalls.push(JSONitem.wakeUpCalls[i]);
		}
		for(var i = 0; i < JSONitem.afterSave.length){
			userFunctions.afterSave.push(JSONitem.afterSave[i]);
		}	
	}
}

function saveUserFunctions(newUserFunctions){
	if(newUserFunctions){
		localStorage.setItem("inknote-userfunctions", newUserFunctions);
	}
	else{
		localStorage.setItem("inknote-userfunctions", userFunctions);
	}
}

//on load add all user functions stored in local storage:
addUserFunctionsFromJSON(getLocalUserFunctions());

//go through all on load user functions
for(var i = 0; i < userFunctions.wakeUpCalls.length; i++){
	userFunctions.wakeUpCalls[i]();
}
