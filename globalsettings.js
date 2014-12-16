//set up canvas
var canvas = document.getElementById('canvas');
canvas.width = $window.innerWidth;
canvas.height = $window.innerHeight;
var context = canvas.getContext('2d');

//set up drawing colours
var staveColour = "black";
var noteColour = "red";
var textColour = "green";

var keypressFuncsOn = true;

//url to server (for bug reports)
var serverURL = "https://lit-basin-6551.herokuapp.com";

// get a new unique id
function newID(){
	return ((new Date).getTime() + "").substr(3) + Math.floor(100000 * Math.random());
}
		
