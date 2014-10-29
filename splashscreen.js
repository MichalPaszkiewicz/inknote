var splashscreen = function(canvas, ctx){
	var tempWidth = 100;


	for(var i = 0; i < 500; i++){
		context.clearRect(0,0,canvas.width,canvas.height);
		context.beginPath();
		context.fillStyle = "red";
		context.arc(canvas.width / 2, canvas.height / 2, tempWidth, 0, 2 * Math.PI, false);
		context.fill();
		
		tempWidth = tempWidth - 0.1;
	}

}
