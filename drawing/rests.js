function drawSemiBreveRest(ctx, x, y, height){

}

function drawMinimRest(ctx, x, y, height){
	
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

function drawRest(ctx, x, y, duration, height){

}
