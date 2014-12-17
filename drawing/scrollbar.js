var isInScrollBar = function(canvas, context, x, y){
	var height = 400;
	var width = 30;
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
	var width = 30;
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

function getCurrentLine(y, lines){
	for(var i = 0; i < lines.length; i++){
		if(lines[i].y > y)
		return lines[i].barNumber;
	}
	return false;
}

var drawScrollPreview = function(canvas, context, y, lines){
	var rightMargin = 30;
	var width = 100;
	var height = 100;
	var farLeft = canvas.width - (rightMargin + width) - 15;
	
	context.beginPath();
	context.moveTo(farLeft, y);
	context.lineTo(farLeft + width + 10, y);
	context.lineTo(farLeft + width, y + 5)
	context.lineTo(farLeft + width, y + height);
	context.lineTo(farLeft, y + height);
	context.lineTo(farLeft, y);
	context.strokeStyle = "black";
	context.lineWidth = 4;
	context.stroke();
	context.fillStyle="white";
	context.fill();
	context.lineWidth = 1;
	
	var tempCurrentLine = getCurrentLine(y, lines);
	if(tempCurrentLine != false){
		context.font = "bold 16px Arial";
		context.fillText(tempCurrentLine, farLeft + width / 2, y + height / 2);
	}
}
