//dependencies: item.js
var drawSingleBar = function(canvas, context, x, y, bar, width, height){
	context.beginPath();
	var startX = x;
	var finalX = x + width;
	var startY = y;
	
	var tempY = startY;
	
	for(var j = 0; j < 5; j++){
		context.beginPath();
		context.moveTo(x, tempY);
		context.lineTo(finalX, tempY);
		context.strokeStyle = staveColour;
		context.stroke();
		tempY += height / 4;
	}
	
	context.fillStyle = noteColour;
	log("Time signature font: " + "bold " + (2 * $scope.lineHeight/3) + "px Arial");
	context.font = "bold " + (2 * height/3) + "px Arial";
	context.fillText(bar.timeSignature.top, x, y + height/2);
	context.fillText(bar.timeSignature.bottom, x, y + height);
}
