var splashscreen = function(canvas, context, time){
	
	var tempWidth = 0;
	
	if( time < 180){
		tempWidth = 200 - time;
	}
	else{
		tempWidth = 2 * time - 360;
	}
	
	context.clearRect(0,0,canvas.width,canvas.height);
	context.beginPath();
	context.fillStyle = "red";
	context.arc(canvas.width / 2, canvas.height / 2, tempWidth, 0, 2 * Math.PI, false);
	context.fill();
}
