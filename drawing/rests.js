function drawSemiBreveRest(ctx, x, y, height){
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + 2 * height, y);
	ctx.lineTo(x + 2 * height, y + height / 2);
	ctx.lineTo(x, y + height / 2);
	ctx.lineTo(x, y);
	ctx.fill();
}

function drawMinimRest(ctx, x, y, height){
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(x + 2 * height, y);
	ctx.lineTo(x + 2 * height, y - height / 2);
	ctx.lineTo(x, y - height / 2);
	ctx.lineTo(x, y);
	ctx.fill();
}

function drawCrotchetRest(ctx, x, y, height){
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.quadraticCurveTo(x + height, y - height/2, x, y - height);
	ctx.quadraticCurveTo(x + 2 * height, y, x + height / 2, y + height / 2);
	ctx.quadraticCurveTo(x - height, y + height, x +  height / 2, y + 3 * height / 2);
	
	ctx.quadraticCurveTo(x - height/ 2, y + 7 * height/ 4, x, y + 5 * height / 2);
	ctx.quadraticCurveTo(x - 3 * height / 2, y + 6 * height/ 4, x +  height / 2, y + 3 * height / 2);
	
	ctx.quadraticCurveTo(x - 2 * height, y + height / 2, x, y);
	
	ctx.fill();
	ctx.stroke();
}

function drawQuaverRest(ctx, x, y, height){
	ctx.beginPath();
	ctx.arc(x, y, height / 4, 0, 2 * Math.PI);
	ctx.fill();
	
	ctx.moveTo(x, y); 
	ctx.bezierCurveTo( x + height / 2, y + height , x + 3 * height / 2, y + height / 2, x + 2 * height, y); 
	ctx.bezierCurveTo( x + 3 * height / 2, y + height / 2 , x + height / 2, y + height, x - height / 5, y + height * 0.75 / 4); 
	ctx.stroke();
	ctx.fill();
	
	ctx.moveTo(x + 2 * height, y);
	ctx.lineTo(x, y + height * 4);
	ctx.stroke();
}

function drawSemiQuaverRest(ctx, x, y, height){
	drawQuaverRest(ctx, x, y, height);
	drawQuaverRest(ctx, x - height, y + 2 * height, height);
}

function drawDemiSemiQuaverRest(ctx, x, y, height){
	drawQuaverRest(ctx, x, y, height);
	drawQuaverRest(ctx, x - height, y + 2 * height, height);
	drawQuaverRest(ctx, x + height, y - 2 * height, height);	
}

function drawHemiDemiSemiQuaverRest(ctx, x, y, height){
	drawQuaverRest(ctx, x, y, height);
	drawQuaverRest(ctx, x - height, y + 2 * height, height);
	drawQuaverRest(ctx, x + height, y - 2 * height, height);	
	drawQuaverRest(ctx, x - height * 2, y + 4 * height, height);
}

/* y should be middle of second top line, ideally. */
function drawRest(ctx, x, y, duration, lineHeight){
	ctx.strokeStyle = noteColour;
	ctx.fillStyle = noteColour;
	var height = lineHeight/2;
	if(duration.denom == 1){
		switch(duration.num){
			case 1:
				drawCrotchetRest(ctx, x, y, height * 3/2);
				break;
			case 2:
				drawMinimRest(ctx, x, y, height * 2);
				break;
			case 4:
				drawSemiBreveRest(ctx, x, y, height * 2);
				break;
		}
	}
	else{
		switch(duration.denom){
			case 2:
				drawQuaverRest(ctx, x, y, height);
				break;
			case 4:
				drawSemiQuaverRest(ctx, x, y, height);
				break;
			case 8:
				drawDemiSemiQuaverRest(ctx, x, y, height);
				break;
			case 16:
				drawHemiDemiSemiQuaverRest(ctx, x, y, height);
				break;
		}
	}
	ctx.strokeStyle = staveColour;
	ctx.fillStyle = staveColour;
}
