var staveColour = "black";
var noteColour = "red";
var textColour = "green";

var keypressFuncsOn = true;

var serverURL = "https://lit-basin-6551.herokuapp.com";

// get a new unique id
function newID(){
	return ((new Date).getTime() + "").substr(3) + Math.floor(100000 * Math.random());
}
		
