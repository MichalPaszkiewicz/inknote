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
	drawQuaverRest(ctx, x, y, lineHeight);
	drawQuaverRest(ctx, x - lineHeight, y + 2 * lineHeight, lineHeight);
}

function drawDemiSemiQuaverRest(ctx, x, y, height){
	drawQuaverRest(ctx, x, y, lineHeight);
	drawQuaverRest(ctx, x - lineHeight, y + 2 * lineHeight, lineHeight);
	drawQuaverRest(ctx, x + lineHeight, y - 2 * lineHeight, lineHeight);	
}

function drawHemiDemiSemiQuaverRest(ctx, x, y, height){
	drawQuaverRest(ctx, x, y, lineHeight);
	drawQuaverRest(ctx, x - lineHeight, y + 2 * lineHeight, lineHeight);
	drawQuaverRest(ctx, x + lineHeight, y - 2 * lineHeight, lineHeight);	
	drawQuaverRest(ctx, x - lineHeight * 2, y + 4 * lineHeight, lineHeight);
}

/* y should be middle of second top line, ideally. */
function drawRest(ctx, x, y, duration, height){
	if(duration.denom == 1){
		switch(duration.num){
			case 1:
				drawCrotchetRest(ctx, x, y, height);
			case 2:
				drawMinimRest(ctx, x, y, height);
			case 4:
				drawSemiBreveRest(ctx, x, y, height);
		}
	}
	else{
		switch(duration.denom){
			case 2:
				drawQuaverRest(ctx, x, y, height);
			case 4:
				drawSemiQuaverRest(ctx, x, y, height);
			case 8:
				drawDemiSemiQuaverRest(ctx, x, y, height);
			case 16:
				drawHemiDemiSemiQuaverRest(ctx, x, y, height);
		}
	}
}
