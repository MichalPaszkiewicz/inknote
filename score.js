// <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.17/angular.min.js"></script>

var canvasModule = angular.module('app', []).
	controller("canvasCtrl", function canvasCtrl($scope, $window){
		var canvas = document.getElementById('canvas');
		canvas.width = $window.innerWidth;
		canvas.height = $window.innerHeight;
		var context = canvas.getContext('2d');
			
		$scope.margin = 50;
		
		$scope.lines = [
		   
		];
		
		$scope.addLine = function(before) {
			var id = 0;
			if($scope.lines.length > 0) {
				id = $scope.lines[$scope.lines.length-1].id + 1;
			}
			var tempLine = {id: id, notes: []};
			if(before == null || before == undefined){			
				$scope.lines.push(tempLine)
			}
			else if( isNaN(before) ){
				throw "addLine() only accepts numbers, or nothing!";
			}
			else{
				$scope.lines.splice(before, 0, tempLine);
			}	
			
			$scope.drawLines($scope.lines);
		}
		
		$scope.action = function(e){
			var tempCanvas = document.getElementById('canvas');
            var x = e.clientX - tempCanvas.offsetLeft;
            var y = e.clientY - tempCanvas.offsetTop;    
            var amount = 10;
            console.log("[" + x + "," + y + "]");
			
			if($scope.lines.length < 1)
			{
				$scope.addLine();
			}
			
			$scope.addNote(5,$scope.lines[0]);
		}
		
		$scope.addNote = function(note, line){
		
			var id = 0;
			var tempNotes = $scope.lines[line.id].notes;
			
			if(tempNotes.length > 0) {
				id = tempNotes[tempNotes.length-1].id + 1;
			}
			var tempNote = {id: id, note: note, line: line};
			$scope.lines[line.id].notes.push(tempNote);
			
			$scope.drawLines($scope.lines);
		}
		
		$scope.removeNote = function(line, note){
			console.log("[" + line + "," + note + "]");
			
			var tempLine = {};
			for(var i=0; i<$scope.lines.length; i++)
			{
				if($scope.lines[i].id == line.id){
					tempLine = $scope.lines[i];
				}
			}
			
			for(var i=0; i<tempLine.notes.length; i++) {
				if(tempLine.notes[i].id === note.id) {
					console.log("removing item at position: "+i);
					tempLine.notes.splice(i, 1);    
				}
			}
			
			context.clearRect(0,0,600,400);
			$scope.drawLines($scope.lines);
			console.log($scope.lines);
		}
		
		$scope.drawLines = function(lines){
			for(var i = 0; i < lines.length; i++)
			{
				$scope.drawLine(lines[i]);
			}
		}
		
		$scope.drawLine = function(line){
			var x = $scope.margin; 
			var y = 200;
			
			for(var i = 0; i < 5; i++)
			{
				context.beginPath();
				context.moveTo(x, y);
				context.lineTo(canvas.width - $scope.margin, y);
				context.stroke();
				y += 8;
			}
		}
		
		$scope.drawNote = function(line, note)
		{
		
		}
		
		$scope.addLine();
		$scope.drawLines($scope.lines);	
	});
	//.factory('Note', function( line ){	});
	
// https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
// http://demisx.github.io/angularjs/2014/09/14/angular-what-goes-where.html
// https://docs.angularjs.org/guide/services
// http://viralpatel.net/blogs/angularjs-service-factory-tutorial/


// http://jsfiddle.net/r4TMq/71/
