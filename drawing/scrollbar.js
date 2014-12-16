var drawScrollBar = function(canvas, context, scrollPosition, maxScroll){
	var height = 400;
	var width = 20;
	var distanceFromTop = 100;
	
	context.strokeStyle=staveColour;
	context.rect(canvas.width - width, distanceFromTop, canvas.width, distanceFromTop + height);
	context.stroke();
	context.beginPath();
	context.moveTo(canvas.width - width, scrollPosition + distanceFromTop);
	context.lineTo(canvas.width, scrollPosition / maxScroll + distanceFromTop); 
	context.stroke();
}
