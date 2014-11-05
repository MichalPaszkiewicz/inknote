// <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.0-beta.17/angular.min.js"></script>

var canvasModule = angular.module('app', []).
	controller("canvasCtrl", function canvasCtrl($scope, $window, $timeout){
		var canvas = document.getElementById('canvas');
		canvas.width = $window.innerWidth;
		canvas.height = $window.innerHeight;
		var context = canvas.getContext('2d');
		var drawOn = false;
		
		var isNewInstrument = false;
		
		$scope.toggleNewInstrument = function () {
		        isNewInstrument = !isNewInstrument;  
		};

		$scope.openInstrumentName = function () {
			return isNewInstrument;
		};
			
		$scope.margin = 50;
		$scope.lineHeight = 48;
		$scope.instrumentHeight = 100;
		
		//lines are for visual display only
		$scope.lines = [
		   
		];
		
		$scope.getFiles = function(){
			var files = JSON.parse(localStorage.getItem("inknote-files"));
			if(files == null || files == undefined){
				return [];
			}
			else{
				return files;
			}
		}
		
		$scope.saveFiles = function(){
			//$scope.currentFile.instruments = $scope.instruments;
			if($scope.files != []){ getFile($scope.currentFileID).instruments = $scope.instruments; }
			var tempFiles = [];
			for(var i = 0; i < $scope.files.length; i++)
			{
				if($scope.files[i].instruments.length > 0){
					if($scope.files[i].instruments[0].bars.length > 0){
						tempFiles.push($scope.files[i]);
					}
				}
			}
			$scope.files = tempFiles;
			localStorage.setItem("inknote-files", JSON.stringify(tempFiles));
		}
		
		function newID(){
			return (new Date).getTime() + "" + Math.floor(100 * Math.random());
		}
		
		function getFile(id){
			for(var i = 0; i < $scope.files.length; i++){
				if($scope.files[i].id == id){
					return $scope.files[i];
				}
			}
		}
		
		$scope.newFile = function(name){
			var newname = name;
			if(newname == null || newname == undefined || newname == ""){newname = "unnamed"}
			var tempID = newID();
			$scope.files.push({name: newname, id: tempID, instruments: []});
			$scope.currentFileID = tempID;
			$scope.instruments = getFile(tempID).instruments;
			if($scope.instruments.bars != null && $scope.instruments.bars != undefined && $scope.instruments.bars.length > 0)
			{
				$scope.draw();
			}
		}
		
		$scope.openFile = function(file){
			$scope.currentFileID = file.id;
			$scope.instruments = file.instruments;
			$scope.draw();
		}
		
		//todo: migrate instruments to file object.
		$scope.files = [];
		
		$scope.currentFileID = "";
		
		var setFiles = function(){
			$scope.files = $scope.getFiles();
			$scope.newFile();
		};
		
		setFiles();
		
		//eventually there will be a possibility of many instruments
		$scope.instruments = [
			
		];
		
		$scope.addInstrument = function(instrumentName){
			var id = 0;
			if($scope.instruments.length > 0){
				id = $scope.instruments[$scope.instruments.length-1].id + 1;
			}
			
			$scope.instruments.push({name: instrumentName, id: id, bars: []});
			
			if(drawOn){
				$scope.draw();
			}
		}
		
		$scope.addBar = function(instrumentNo, before) {
			if(drawOn){
				var id = 0;
				var instrument = $scope.instruments[instrumentNo];
				
				if(instrument.bars.length > 0) {
					id = instrument.bars[instrument.bars.length-1].id + 1;
				}
				var tempBar = {id: id, items: [], x: null, y: null};
				if(before == null || before == undefined){			
					instrument.bars.push(tempBar)
				}
				else if( isNaN(before) ){
					throw "addBar(0) also only accepts numbers, or nothing!";
				}
				else{
					instrument.bars.splice(before, 0, tempBar);
				}	
			}
			else{return};
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
			
			var itemY = ($scope.lineHeight/8) * Math.round((y - 200) / ($scope.lineHeight/8));
			
			$scope.addItem(itemY, $scope.instruments[0].bars[$scope.instruments[0].bars.length - 1]);
		}
		
		$scope.addItem = function(value, bar){
			var thisBar = bar;
			
			if(bar.items.length > 3){
				$scope.addBar(0);
				var thisBar = $scope.instruments[0].bars[$scope.instruments[0].bars.length - 1];
			}
			
			var id = 0;
			var tempItems = thisBar.items;
			
			if(tempItems.length > 0) {
				id = tempItems[tempItems.length-1].id + 1;
			}
			var tempItem = {id: id, value: value, barID: bar.id, x: null, y: null};
			thisBar.items.push(tempItem);
			
			$scope.draw();
		}
		
		$scope.removeItem = function(bar, item){
			var tempBar = {};
			for(var i=0; i<$scope.instruments[0].bars.length; i++)
			{
				if($scope.instruments[0].bars[i].id == bar.id){
					tempBar = $scope.instruments[0].bars[i];
				}
			}
			
			for(var i=0; i<tempBar.items.length; i++) {
				if(tempBar.items[i].id === item.id) {
					tempBar.items.splice(i, 1);    
				}
			}
			
			$scope.draw();
		}
		
		$scope.draw = function(){
			context.clearRect(0,0,canvas.width,canvas.height);
			$scope.drawInit();
			$scope.drawLines();
		}
		
		$scope.drawInit = function(){
			if($scope.lines.length < 1)
			{
				$scope.lines.push({x: $scope.margin, y: 200, instruments: $scope.instruments, xSplitting: null});
			}
			else{
				$scope.lines[0].instruments = $scope.instruments;
			}
			
			for(var i = 0; i < $scope.lines.length; i++){
				var tempLine = $scope.lines[i];
				tempLine.instruments = $scope.instruments;
				var tempX = 0;
				tempLine.xSplitting = (canvas.width - (2 * $scope.margin)) / tempLine.instruments[0].bars.length;
				for(var j = 0; j < tempLine.instruments.length; j++){
					var tempInstrument = tempLine.instruments[j];
					tempInstrument.x = tempLine.x;
					tempInstrument.y = tempLine.y + j * $scope.instrumentHeight;
					for(var k = 0; k < tempLine.instruments[j].bars.length; k++){
						var tempBar = tempInstrument.bars[k];
						tempBar.y = tempInstrument.y;
						tempBar.x = tempX + tempLine.x;
						tempX = tempX + tempLine.xSplitting;
						var tempItemX = 0;
						for(var l = 0; l < tempBar.items.length; l++){
							var tempItem = tempBar.items[l];
							tempItem.x = tempBar.x + tempItemX + 50;
							tempItem.y = tempBar.y;
							tempItemX += 50;
						}
					}
				}
			}	
		}
		
		$scope.drawLines = function(){
			for(var i = 0; i < $scope.lines.length; i++){
				$scope.drawLine($scope.lines[i]);
				
				$scope.drawBars($scope.lines[i].instruments[0].bars);
			};
		}
		
		$scope.drawLine = function(line){
			for(var i = 0; i < line.instruments.length; i++){
				$scope.drawInstrument(line.instruments[i]);
			}
			
			context.beginPath();
			var startX = $scope.margin;
			var finalX = canvas.width - $scope.margin;
			var startY = parseInt(line.instruments[0].y);
			var bottomY = startY + (line.instruments.length - 1) * ($scope.instrumentHeight) + $scope.lineHeight;
			context.moveTo(startX, startY);
			context.lineTo(startX, bottomY);
			context.stroke();
			context.moveTo(finalX, startY);
			context.lineTo(finalX, bottomY);
			context.stroke();
		}
		
		$scope.drawInstrument = function(instrument){
			var tempY = parseInt(instrument.y);
			for(var j = 0; j < 5; j++)
			{
				context.beginPath();
				context.moveTo(instrument.x, tempY);
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
			for(var i = 0; i < bar.items.length; i++){
				$scope.drawItem(bar, bar.items[i]);
			}
		}
		
		$scope.drawItem = function(bar, item)
		{
			context.beginPath();
			context.fillStyle = "red";
			context.arc(item.x, bar.y + item.value, 6, 0, 2 * Math.PI, false);
			context.fill();
		}
		
		var time = 0;
		
		var particles = [];
		var delta = 0;
		var last = Date.now();
		
		for(var i = 0; i < 36 * 2; i++){
			particles.push({
				x: canvas.width / 2,
				y: canvas.height / 2,
				angle: i * 5,
				size : 10 + Math.random() * 15,
				life : 500 + Math.random() * 1500
			});
		}
		
		var canvaspic = document.getElementById('canvasImg');
		canvaspic.style.position = "absolute";
		canvaspic.style.left = 0;
		canvaspic.style.top = 0;
		
		$scope.startup = function(){
				if(time == 80){
					context.fillStyle = "white";
					context.font = "bold 16px Arial";
					context.fillText("inknote", canvas.width / 2, canvas.height / 2);
					var dataURL = canvas.toDataURL();
      					canvaspic.src = dataURL;
      					context.clearRect(0,0,canvas.width, canvas.height);
      					time++;
      					$timeout($scope.startup, 10);
				}
				else if(time > 80 && time < 150){
					time++;
					$timeout($scope.startup, 10);
				}
				else if(time > 150 && time < 200){
					var tleft = (time - 150) * (-canvas.width / 2 + 10) / 50;
					var tright = (time - 150) * (-canvas.height / 2 + 30) / 50;
					canvaspic.style.left = tleft + "px";
					canvaspic.style.top = tright + "px";
					time++;
					$timeout($scope.startup, 10);
				}
				else if(time == 250){
					$scope.addInstrument("piano");
					$scope.addBar(0);
					$scope.draw();
					drawOn = true;
				}
				else{
					animate(particles, delta, last);
					render(context, particles);
					time++;
					$timeout($scope.startup, 10);
				}
		}
		
		$timeout($scope.startup, 10);
		
		$scope.collaborators = [
			{name: "Penguin", permission: "Read"},
			{name: "Tiger", permission: "Write"},
			{name: "Parrot", permission: "Read"}
		];
		
		$scope.allCollaboratorsAre = function(type, process){
			if(process == "set")
			{
				for(var i = 0; i < $scope.collaborators.length; i++)
				{
					$scope.collaborators[i].permission = type;
				}
				return;
			}
			for(var i = 0; i < $scope.collaborators.length; i++)
			{
				if(type != $scope.collaborators[i].permission){
					return false;
				}
			}
			return true;
		}
	});
	//.factory('Note', function( line ){	});
	
// https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
// http://demisx.github.io/angularjs/2014/09/14/angular-what-goes-where.html
// https://docs.angularjs.org/guide/services
// http://viralpatel.net/blogs/angularjs-service-factory-tutorial/


// http://jsfiddle.net/r4TMq/71/
