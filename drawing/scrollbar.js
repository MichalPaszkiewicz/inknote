var drawScrollBar = function(canvas, context, scrollPosition){
	var height = 400;
	var width = 20;
	var distanceFromTop = 100;
	scrollPosition = 50;
	
	context.strokeStyle=staveColour;
	context.rect(canvas.width - width, distanceFromTop, canvas.width, distanceFromTop + height);
	context.stroke();
	context.beginPath();
	context.moveTo(canvas.width - width, scrollPosition + distanceFromTop);
	context.lineTo(canvas.width, scrollPosition + distanceFromTop); 
	context.stroke();
}
