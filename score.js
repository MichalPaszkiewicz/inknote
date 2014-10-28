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
		
		$scope.bars = [
			
		];
		
		$scope.addBar = function(before) {
			var id = 0;
			if($scope.bars.length > 0) {
				id = $scope.bars[$scope.bars.length-1].id + 1;
			}
			var tempBar = {id: id, notes: []};
			if(before == null || before == undefined){			
				$scope.bars.push(tempBar)
			}
			else if( isNaN(before) ){
				throw "addBar() only accepts numbers, or nothing!";
			}
			else{
				$scope.bars.splice(before, 0, tempBar);
			}	
			
			$scope.drawBars($scope.bars);
		}
		
		$scope.action = function(e){
			var tempCanvas = document.getElementById('canvas');
			var x = e.clientX - tempCanvas.offsetLeft;
			var y = e.clientY - tempCanvas.offsetTop;    
			var amount = 10;
			console.log("[" + x + "," + y + "]");
			
			if($scope.bars.length < 1)
			{
				$scope.addBar();
			}
			
			$scope.addNote(5,$scope.bars[0]);
			
			
		}
		
		$scope.addNote = function(note, bar){
		
			var id = 0;
			var tempNotes = $scope.bars[bar.id].notes;
			
			if(tempNotes.length > 0) {
				id = tempNotes[tempNotes.length-1].id + 1;
			}
			var tempNote = {id: id, note: note, bar: bar};
			$scope.bars[bar.id].notes.push(tempNote);
			
			$scope.drawBars($scope.bars);
		}
		
		$scope.removeNote = function(bar, note){
			console.log("[" + bar + "," + note + "]");
			
			var tempBar = {};
			for(var i=0; i<$scope.bars.length; i++)
			{
				if($scope.bars[i].id == bar.id){
					tempBar = $scope.bars[i];
				}
			}
			
			for(var i=0; i<tempBar.notes.length; i++) {
				if(tempBar.notes[i].id === note.id) {
					console.log("removing item at position: "+i);
					tempBar.notes.splice(i, 1);    
				}
			}
			
			context.clearRect(0,0,600,400);
			$scope.drawBars($scope.bars);
			console.log($scope.bars);
		}
		
		$scope.drawBars = function(bars){
			for(var i = 0; i < bars.length; i++)
			{
				$scope.drawBar(bars[i]);
			}
		}
		
		$scope.drawBar = function(bar){
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
			
			for(var i = 0; i < bar.notes.length; i++){
				$scope.drawNote(bar, bar.notes[i]);
			}
		}
		
		$scope.drawNote = function(bar, note)
		{
			context.beginPath();
			context.fillStyle = red;
			context.arc(50, 20 * note, 6, 0, 2 * Math.PI, false);
			context.fill();
		}
		
		$scope.addBar();
		$scope.drawBars($scope.bars);	
	});
	//.factory('Note', function( line ){	});
	
// https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
// http://demisx.github.io/angularjs/2014/09/14/angular-what-goes-where.html
// https://docs.angularjs.org/guide/services
// http://viralpatel.net/blogs/angularjs-service-factory-tutorial/


// http://jsfiddle.net/r4TMq/71/
