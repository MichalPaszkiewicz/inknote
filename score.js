var canvasModule = angular.module('app', ['monospaced.mousewheel']).
	controller("canvasCtrl", function canvasCtrl($scope, $window, $timeout){
		var canvas = document.getElementById('canvas');
		canvas.width = $window.innerWidth;
		canvas.height = $window.innerHeight;
		var context = canvas.getContext('2d');
		var drawOn = false;
		
		$scope.windowScrollAmount = 30;
		$scope.windowScroll = 0;
		
		var isNewInstrument = false;
		
		$scope.handleScroll = function($event, $delta, $deltaX, $deltaY){
			console.log($event + ' ' + $delta + ' ' + $deltaX + ' ' + $deltaY);
			
			if(drawOn){
				if($deltaY == 1){
					if($scope.windowScroll > 0){
						$scope.windowScroll -= $scope.windowScrollAmount;
						$scope.draw();
					}
				}
				else if($deltaY == -1){
					if($scope.windowScroll < $scope.lines[$scope.lines.length - 1].y){
						$scope.windowScroll += $scope.windowScrollAmount;
						$scope.draw();
					}
				}
			}
		};
		
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
			$scope.windowScroll = 0;
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
			$scope.windowScroll = 0;
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
		
		$scope.instruments.timeSignature = {top: 4, bottom: 4};
		
		$scope.addInstrument = function(instrumentName){
			var id = 0;
			if($scope.instruments.length > 0){
				id = $scope.instruments[$scope.instruments.length-1].id + 1;
			}
			
			var newInstrument = {name: instrumentName, id: id, bars: [], visible: true};
			var barId = 0;
			if($scope.instruments.length > 0){
				while(newInstrument.bars.length < $scope.instruments[0].bars.length){
					var timeSig = $scope.instruments[0].bars[barId].timeSignature;
					var newBar = {id: id, items: [], x: null, y: null, timeSignature: timeSig};
					newInstrument.bars.push(newBar);
					barId++;
				}
			}
			
			$scope.instruments.push(newInstrument);
			
			if(drawOn){
				$scope.draw();
			}
		}
		
		$scope.addBar = function(before) {
			if(drawOn){
				for(var i = 0; i < $scope.instruments.length; i++){
					var id = 0;
					var instrument = $scope.instruments[i];
					
					if(instrument.bars.length > 0) {
						id = instrument.bars[instrument.bars.length-1].id + 1;
					}
					var timeSig = $scope.instruments.timeSignature;
					var tempBar = {id: id, items: [], x: null, y: null, timeSignature: timeSig};
					if(before == null || before == undefined){			
						instrument.bars.push(tempBar)
					}
					else if( isNaN(before) ){
						throw "addBar() only accepts numbers, or nothing!";
					}
					else{
						instrument.bars.splice(before, 0, tempBar);
					}
				}
			}
			else{return};
		}
		
		$scope.action = function(e){
			var tempCanvas = document.getElementById('canvas');
			var x = e.clientX - tempCanvas.offsetLeft;
			var y = e.clientY - tempCanvas.offsetTop + $scope.windowScroll;
			var amount = 10;
			console.log("[" + x + "," + y + "]");
			
			if($scope.instruments.length < 1)
			{
				$scope.addInstrument("piano");
			}
			
			if($scope.instruments[0].bars.length < 1)
			{
				$scope.addBar();
			}
			
			var itemY = ($scope.lineHeight/8) * Math.round((y - 200) / ($scope.lineHeight/8));
			
			$scope.addItem(itemY, $scope.instruments[0].bars[$scope.instruments[0].bars.length - 1]);
		}
		
		$scope.addItem = function(value, bar){
			var thisBar = bar;
			
			if(bar.items.length > 3){
				$scope.addBar();
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
			var lineSeperator = 200;
			if($scope.lines.length < 1)
			{
				$scope.lines.push({x: $scope.margin, y: lineSeperator, instruments: $scope.instruments, xSplitting: null});
			}
			else{
				$scope.lines[0].instruments = $scope.instruments;
				
				while($scope.lines.length < Math.ceil($scope.lines[0].instruments[0].bars.length / 5)){
					lineSeperator += 200;
					$scope.lines.push({x: $scope.margin, y: lineSeperator, instruments: [], xSplitting: null});
				}
				
				var numBars = $scope.instruments[0].bars.length;
				
				for(var i = 0; i < $scope.lines.length; i++){
					$scope.lines[i].instruments = [];
				}
				
				for(var barIndex = 0; barIndex < numBars; barIndex++){
					var lineIndex = Math.floor(barIndex / 5);
					for(var instrumentIndex = 0; instrumentIndex < $scope.instruments.length; instrumentIndex++){
						if($scope.lines[lineIndex].instruments[instrumentIndex] == null || $scope.lines[lineIndex].instruments[instrumentIndex] == undefined){
							var instrumentName = $scope.instruments[instrumentIndex].name;
							var newInstrument = {name: instrumentName, id: instrumentIndex, bars: [], visible: true};
							$scope.lines[lineIndex].instruments.push(newInstrument);
						}
						$scope.lines[lineIndex].instruments[instrumentIndex].bars.push($scope.instruments[instrumentIndex].bars[barIndex]);
					}
				}
				
				/*if($scope.instruments[0].bars.length > 0){
					var line = 0;
					var bar = 0;
					var totalLines = $scope.instruments[0].bars.length;
					
					for(var i = 0; i < $scope.instruments[0].bars.length; i += 4){
						var currentLine = $scope.lines[$scope.lines.length - 1];
						currentLine.instruments = $scope.instruments;
						for(var j = 0; j < currentLine.instruments.length; j++){
							var currentInstrument = currentLine.instruments[j];
							currentInstrument.bars = [];
							for(var k = bar; k < bar + 4; k++){
								if($scope.instruments[i].bars.length > k){
									currentInstrument.bars.push($scope.instruments[i].bars[k]);
									bar++;
								}
								else{
									break;
								}
							}
						}
						lineSeperator += 200;
						if(bar <= totalLines){
							$scope.lines.push({x: $scope.margin, y: lineSeperator, instruments: $scope.instruments, xSplitting: null});
						}
						else{
							break;
						}
					}
				}*/
			}
			
			for(var i = 0; i < $scope.lines.length; i++){
				var tempLine = $scope.lines[i];
				
				
				tempLine.instruments = [];
				for(var j = 0; j < $scope.instruments.length; j++){
					if($scope.instruments[j].visible){
						tempLine.instruments.push($scope.instruments[j]);
					}
				}
				
				tempLine.xSplitting = (canvas.width - (2 * $scope.margin)) / tempLine.instruments[0].bars.length;
				for(var j = 0; j < tempLine.instruments.length; j++){
					var tempX = 0;
					var tempInstrument = tempLine.instruments[j];
					tempInstrument.x = tempLine.x;
					tempInstrument.y = tempLine.y + j * $scope.instrumentHeight - $scope.windowScroll;
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
				
				for(var j = 0; j < $scope.lines[i].instruments.length; j++){
					$scope.drawBars($scope.lines[i].instruments[j].bars);
				}
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
			
			context.fillStyle = "green";
			context.font = "bold 16px Arial";
			context.fillText(instrument.name, instrument.x + 5, tempY - 10);
			context.fillStyle = "black";
			
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
					$scope.addBar();
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
		
		$scope.allInstrumentsOn = function(){
			for(var i = 0; i < $scope.instruments.length; i++){
				$scope.instruments[i].visible = true;
			}
			$scope.draw();
		}
		
		$scope.soloInstrument = function(instrumentID){
			for(var i = 0; i < $scope.instruments.length; i++){
				$scope.instruments[i].visible = false;
				if($scope.instruments[i].id == instrumentID){
					$scope.instruments[i].visible = true;
				}
			}
			$scope.draw();
		}
		
		$scope.isOnlyDisplayed = function(instrumentID){
			var visibleItems = $scope.instruments.countWhere(function(item){
				return item.visible;	
			});
			
			return visibleItems == 1 && $scope.instruments[$scope.instruments.getIndexFromID(instrumentID)].visible;
		}
	});
	//.factory('Note', function( line ){	});
	
// https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
// http://demisx.github.io/angularjs/2014/09/14/angular-what-goes-where.html
// https://docs.angularjs.org/guide/services
// http://viralpatel.net/blogs/angularjs-service-factory-tutorial/


// http://jsfiddle.net/r4TMq/71/
