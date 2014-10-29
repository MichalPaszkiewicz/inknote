// <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.17/angular.min.js"></script>

var canvasModule = angular.module('app', []).
	controller("canvasCtrl", function canvasCtrl($scope, $window, $timeout){
		var canvas = document.getElementById('canvas');
		canvas.width = $window.innerWidth;
		canvas.height = $window.innerHeight;
		var context = canvas.getContext('2d');
			
		$scope.margin = 50;
		$scope.lineHeight = 48;
		
		//lines are for visual display only
		$scope.lines = [
		   
		];
		
		//eventually there will be a possibility of many instruments
		$scope.instruments = [
			
		];
		
		$scope.bars = [
			
		];
		
		$scope.addInstrument = function(instrumentName){
			var id = 0;
			if($scope.instruments.length > 0){
				id = $scope.instruments[$scope.instruments.length-1].id + 1;
			}
			
			$scope.instruments.push({name: instrumentName, id: id, bars: []});
		}
		
		$scope.addBar = function(instrumentNo, before) {
			var id = 0;
			var instrument = $scope.instruments[instrumentNo];
			
			if(instrument.bars.length > 0) {
				id = instrument.bars[instrument.bars.length-1].id + 1;
			}
			var tempBar = {id: id, notes: [], x: null, y: null};
			if(before == null || before == undefined){			
				instrument.bars.push(tempBar)
			}
			else if( isNaN(before) ){
				throw "addBar(0) also only accepts numbers, or nothing!";
			}
			else{
				instrument.bars.splice(before, 0, tempBar);
			}	
			
			$scope.draw();
		}
		
		$scope.action = function(e){
			var tempCanvas = document.getElementById('canvas');
			var x = e.clientX - tempCanvas.offsetLeft;
			var y = e.clientY - tempCanvas.offsetTop;    
			var amount = 10;
			console.log("[" + x + "," + y + "]");
			
			if($scope.instruments.length < 1)
			{
				$scope.addInstrument("piano");
			}
			
			if($scope.instruments[0].bars.length < 1)
			{
				$scope.addBar(0);
			}
			
			var noteY = ($scope.lineHeight/8) * Math.round((y - 200) / ($scope.lineHeight/8));
			
			$scope.addNote(noteY, $scope.instruments[0].bars[$scope.instruments[0].bars.length - 1]);
		}
		
		$scope.addNote = function(value, bar){
			var thisBar = bar;
			
			if(bar.notes.length > 3){
				$scope.addBar(0);
				var thisBar = $scope.instruments[0].bars[$scope.instruments[0].bars.length - 1];
			}
			
			var id = 0;
			var tempNotes = thisBar.notes;
			
			if(tempNotes.length > 0) {
				id = tempNotes[tempNotes.length-1].id + 1;
			}
			var tempNote = {id: id, value: value, bar: bar, x: null, y: null};
			thisBar.notes.push(tempNote);
			
			$scope.draw();
		}
		
		$scope.removeNote = function(bar, note){
			console.log("[" + bar + "," + note + "]");
			
			var tempBar = {};
			for(var i=0; i<$scope.instruments[0].bars.length; i++)
			{
				if($scope.instruments[0].bars[i].id == bar.id){
					tempBar = $scope.instruments[0].bars[i];
				}
			}
			
			for(var i=0; i<tempBar.notes.length; i++) {
				if(tempBar.notes[i].id === note.id) {
					console.log("removing item at position: "+i);
					tempBar.notes.splice(i, 1);    
				}
			}
			
			$scope.draw();
			console.log($scope.instruments[0].bars);
		}
		
		$scope.draw = function(){
			context.clearRect(0,0,canvas.width,canvas.height);
			$scope.drawInit();
			$scope.drawLines();
		}
		
		$scope.drawInit = function(){
			if($scope.lines.length < 1)
			{
				$scope.lines.push({x: $scope.margin, y: 200, bars: $scope.instruments[0].bars, xSplitting: null});
			}
			
			for(var i = 0; i < $scope.lines.length; i++){
				var tempLine = $scope.lines[i];
				var tempX = 0;
				tempLine.xSplitting = (canvas.width - (2 * $scope.margin)) / tempLine.bars.length;
				for(var j = 0; j < tempLine.bars.length; j++){
					var tempBar = tempLine.bars[j];
					tempBar.y = tempLine.y;
					tempBar.x = tempX + tempLine.x;
					tempX = tempX + tempLine.xSplitting;
					var tempNoteX = 0;
					for(var k = 0; k < tempBar.notes.length; k++){
						var tempNote = tempBar.notes[k];
						tempNote.x = tempBar.x + tempNoteX + 50;
						tempNote.y = tempBar.y;
						tempNoteX += 50;
					}
				}
			}	
		}
		
		$scope.drawLines = function(){
			for(var i = 0; i < $scope.lines.length; i++){
				$scope.drawLine($scope.lines[i]);
				
				$scope.drawBars($scope.lines[i].bars);
			};
		}
		
		$scope.drawLine = function(line){
			var tempY = parseInt(line.y);
			for(var j = 0; j < 5; j++)
			{
				context.beginPath();
				context.moveTo(line.x, tempY);
				context.lineTo(canvas.width - $scope.margin, tempY);
				context.stroke();
				tempY += $scope.lineHeight / 4;
			}
		}
		
		$scope.drawBars = function(bars){
			for(var i = 0; i < bars.length; i++)
			{
				$scope.drawBar(bars[i]);
			}
		}
		
		$scope.drawBar = function(bar){
			context.beginPath();
			context.moveTo(bar.x, bar.y);
			context.lineTo(bar.x, bar.y + $scope.lineHeight);
			context.stroke();
			for(var i = 0; i < bar.notes.length; i++){
				$scope.drawNote(bar, bar.notes[i]);
			}
		}
		
		$scope.drawNote = function(bar, note)
		{
			context.beginPath();
			context.fillStyle = "red";
			context.arc(note.x, bar.y + note.value, 6, 0, 2 * Math.PI, false);
			context.fill();
		}
		
		var time = 0;
		
		$scope.startup = function(){
				splashscreen(canvas, context, time);
				if(time == 1000){
					$scope.addInstrument("piano");
					$scope.addBar(0);
					$scope.draw();	
				}
				else{
					time++;
					$timeout($scope.startup, 100);
				}
		}
		
		$timeout($scope.startup, 100);
	});
	//.factory('Note', function( line ){	});
	
// https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
// http://demisx.github.io/angularjs/2014/09/14/angular-what-goes-where.html
// https://docs.angularjs.org/guide/services
// http://viralpatel.net/blogs/angularjs-service-factory-tutorial/


// http://jsfiddle.net/r4TMq/71/
