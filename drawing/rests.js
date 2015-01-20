function drawSemiBreveRest(cvs, ctx, x, y, height){

}

function drawCrotchetRest(cvs, ctx, x, y, height){

}

function drawQuaverRest(cvs, ctx, x, y, height){
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

function drawSemiQuaverRest(cvs, ctx, x, y, height){

}

function drawDemiSemiQuaverRest(cvs, ctx, x, y, height){

}

function drawHemiDemiSemiQuaverRest(cvs, ctx, x, y, height){

}

function drawRest(cvs, ctx, x, y, duration, height){

}
