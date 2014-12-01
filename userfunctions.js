/*todo: in future, this file will hold many arrays of user defined functions. The user will be able to add functions to the arrays to, for example, save data to their own database on save, etc. */

var userFunctions = {};

userFunctions.wakeUpCalls = [];
userFunctions.afterSave = [];
userFunctions.afterLoad = [];

for(var i = 0; i < userFunctions.wakeUpCalls.length; i++){
	userFunctions.wakeUpCalls[i]();
}
