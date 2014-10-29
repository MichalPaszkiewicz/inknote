var splashscreen = function(canvas, context, time){
	
	var tempWidth = 0;
	
	if( time < 300){
		if(time < 140){
			tempWidth = 80 - time / 2;
		}
		else if(time < 150){
			tempWidth = 10 + (time - 140) * 10;
		}
		else if(time < 170){
			tempWidth = 110;
			for(var i = 0; i < time - 160; i++){
				tempWidth += 5 / (i - 190);
			}
		}
		else{
			tempWidth = 120;
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
