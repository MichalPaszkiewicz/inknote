var splashscreen = function(canvas, context, time){
	
	var tempWidth = 0;
	
	var oneX = 0, oneY = 0, oneW = 0;
	var twoX = 0, twoY = 0, twoW = 0;
	
	if( time < 200){
		if(time < 140){
			tempWidth = 80 - time / 2;
		}
		else if(time < 150){
			tempWidth = 10 + (time - 140) * 10;
			oneX = (time - 140) * 12;
			oneY = (time - 140) * 10;
			oneW = (time - 140) * 3;
		}
		else if(time < 170){
			tempWidth = 110;
			oneX = 130;
			oneY = 110;
			oneW = 30;
			for(var i = 0; i < time - 150; i++){
				tempWidth += 5 / (i - 150);
				oneX += 7 / (i - 150);
				oneY += 7 / (i - 150);
				oneW += 3 / (i - 150);
			}
		}
		else{
			tempWidth = 120;
			
			oneX = 140;
			oneY = 120;
			oneW = 40;
		}
		
		context.clearRect(0,0,canvas.width,canvas.height);
		context.beginPath();
		context.fillStyle = "black";
		context.arc(canvas.width / 2, canvas.height / 2, tempWidth, 0, 2 * Math.PI, false);
		context.fill();
		
		if(time > 145){
			context.beginPath();
			context.arc(canvas.width / 2 + oneX, canvas.height / 2 + oneY, oneW, 0, 2 * Math.PI, false);
			context.fill();
			
			context.beginPath();
			context.arc(canvas.width / 2 + twoX, canvas.height / 2 + twoY, twoW, 0, 2 * Math.PI, false);
			context.fill();
		}
	}
	else{
		
	}
}
