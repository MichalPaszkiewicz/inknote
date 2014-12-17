var isInScrollBar = function(canvas, context, x, y){
	var height = 400;
	var width = 20;
	var distanceFromTop = 100;
	
	return x > canvas.width - width && y > distanceFromTop && y < distanceFromTop + height;
}

var getScrollPositionFromScrollBar = function(canvas, context, y, maxScroll){
	var height = 400;
	var width = 20;
	var distanceFromTop = 100;
	
	return (y - distanceFromTop) * maxScroll / height;
}

var drawScrollBar = function(canvas, context, scrollPosition, maxScroll){
	var height = 400;
	var width = 20;
	var distanceFromTop = 100;
	
	context.strokeStyle=staveColour;
	context.rect(canvas.width - width, distanceFromTop, width, height);
	context.stroke();
	
	context.beginPath();
	context.strokeStyle=noteColour;
	context.lineWidth =4;
	context.moveTo(canvas.width - width, scrollPosition * height / maxScroll + distanceFromTop);
	context.lineTo(canvas.width, scrollPosition * height / maxScroll + distanceFromTop); 
	context.stroke();
	context.lineWidth = 1;
}

var drawScrollPreview = function(canvas, context, y){
	var rightMargin = 20;
	var width = 50;
	var farLeft = canvas.width - (rightMargin + width) - 12;
	
	context.beginPath();
	context.moveTo(farLeft, y);
	context.lineTo(farLeft + width, y);
	context.lineTo(farLeft + width - 10, y + 5)
	context.lineTo(farLeft + width - 10, y + 50);
	context.lineTo(farLeft, y + 50);
	context.lineTo(farLeft, y);
	context.stroke();
	context.fillStyle="white";
	context.fill();
}
