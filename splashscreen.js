var splashscreen = function(canvas, context, time){
	
	var tempWidth = 0;
	
	if( time < 300){
		if(time < 180){
			tempWidth = 100 - time / 2;
		}
		else if(time < 190){
			tempWidth = 10 + (time - 180) * 10;
		}
		else if(time < 200){
			tempWidth = 110;
			for(var i = 0; i < time - 190; i++){
				tempWidth += 10 / (i - 190);
			}
		}
		else{
			tempWidth = 110;
		}
		
		context.clearRect(0,0,canvas.width,canvas.height);
		context.beginPath();
		context.fillStyle = "black";
		context.arc(canvas.width / 2, canvas.height / 2, tempWidth, 0, 2 * Math.PI, false);
		context.fill();
	}
	else{
		
	}
}
