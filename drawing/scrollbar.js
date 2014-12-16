var drawScrollBar = function(scrollPosition){
	var height = 400;
	var width = 20;
	scrollPosition = 50;
	
	context.rect(20,20,150,100);
	context.stroke();
	context.beginPath();
	context.moveTo(canvas.width - width, scrollPosition);
	context.lineTo(canvas.width, scrollPosition); 
	context.stroke();
}
