var canvasModule = angular.module('app', ['monospaced.mousewheel', 'keypress']).
	controller("canvasCtrl", function canvasCtrl($scope, $window, $timeout, $http){
		var canvas = document.getElementById('canvas');
		canvas.width = $window.innerWidth;
		canvas.height = $window.innerHeight;
		var context = canvas.getContext('2d');
		var drawOn = false;
		
		$scope.logging = false;
		$scope.logWithAlertify = false;
		$scope.bugReport = false;
		$scope.bugMessage = "";
		
		$scope.userFunctionTypes = [{name: "code"},{name: "file"}];
		
		$scope.currentUserFunctionsOpen = false;
		$scope.currentUserFunctions = userFunctions;
		
		$scope.saveUserFunctions = function(){
			localStorage.setItem("inknote-userfunctions", JSON.stringify($scope.currentUserFunctions));
		}
		
		$scope.togglePluginManager = function(){
			keypressFuncsOn = !keypressFuncsOn;
		};
		
		$scope.canScrollCanvas = function(){
			return 	!$scope.bugReport
				&& !$scope.currentUserFunctionsOpen;
		};
		
		var log = function(text, type){
			if($scope.logging){ 
				try{
					if($scope.logWithAlertify){
						if(type == "success"){
							alertify.success(text, "", 2000);
						}
						else if(type == "error"){
							alertify.error(text, "", 2000);
						}
						else{
							alertify.log(text, "", 2000);
						}
					}
					else{
						console.log(text);
					}
				}
				catch(e){
					alertify.error(e.toString(), "", 2000);
				}
			}
		};
		
		$scope.remove = function(array, index){
		    array.splice(index, 1);
		}
		
		var isNewInstrument = false;
		
		// amount page is moved by on scroll
		$scope.windowScrollAmount = 30;
		// current scroll height value
		$scope.windowScroll = 0;
		
		// function handling scroll event
		$scope.handleScroll = function($event, $delta, $deltaX, $deltaY){
			if(!$scope.canScrollCanvas()){
				return;
			}
			
			log($event + ' ' + $delta + ' ' + $deltaX + ' ' + $deltaY);
			
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
		
		// open/close popup displaying instrument name
		$scope.toggleNewInstrument = function () {
		        isNewInstrument = !isNewInstrument;  
		};
		
		// get private value isNewInstrument for displaying popup for inputting name
		$scope.openInstrumentName = function () {
			return isNewInstrument;
		};
			
		$scope.margin = 50;
		
		//describes height of one stave (5 lines)
		$scope.lineHeight = 48;
		
		// distance between 2 instruments in a line
		$scope.instrumentHeight = 100;
		
		//lines are for visual display only
		$scope.lines = [
		   
		];
		
		// get files from localstorage
		$scope.getFiles = function(){
			var files = JSON.parse(localStorage.getItem("inknote-files"));
			if(files == null || files == undefined){
				return [];
			}
			else{
				return files;
			}
		}
		
		// save files to localstorage
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
			
			for(var i = 0; i < userFunctions.afterSave.length; i++){
				if(userFunctions.afterSave[i].type.name == "code"){
					eval(userFunctions.afterSave[i].code);
				}
			}
		}
		
		// get a file from id
		function getFile(id){
			for(var i = 0; i < $scope.files.length; i++){
				if($scope.files[i].id == id){
					return $scope.files[i];
				}
			}
		}
		
		// create a new file
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
		
		// open existing file from localstorage
		$scope.openFile = function(file){
			$scope.lines = [];
			$scope.currentFileID = file.id;
			$scope.instruments = file.instruments;
			$scope.windowScroll = 0;
			// draws twice to first recreate the lines, then actually draw.
			$scope.draw();
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
		
		// instruments of current project. This is where values must be stored. They are changed to lines on drawinit
		$scope.instruments = [
			
		];
		
		// default time signature of file
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
					var newBar = {id: newID(), items: [], x: null, y: null, timeSignature: timeSig};
					newInstrument.bars.push(newBar);
					barId++;
				}
			}
			
			$scope.instruments.push(newInstrument);
			
			if(drawOn){
				$scope.draw();
			}
			
			log("Instrument named: " + instrumentName + " added", "success");
		}
		
		$scope.addBar = function(before) {
			if(drawOn){
				for(var i = 0; i < $scope.instruments.length; i++){
					var id = 0;
					var instrument = $scope.instruments[i];
					
					//if(instrument.bars.length > 0) {
					//	id = instrument.bars[instrument.bars.length-1].id + 1;
					//}
					
					// all IDs absolutely unique.
					id = newID();
					
					var timeSig = $scope.instruments.timeSignature;
					if($scope.instruments[i].bars.length > 0){
						timeSig = $scope.instruments[i].bars[$scope.instruments[i].bars.length - 1].timeSignature;
					}
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
		
		$scope.getFullLineHeight = function(line){
			return (line.instruments.length - 1) * ($scope.instrumentHeight) + $scope.lineHeight;
		}
		
		$scope.selectedInstrumentID = null;
		$scope.selectedBarID = null;
		$scope.selectedItemID = null;
		
		$scope.action = function(e){
			var tempCanvas = document.getElementById('canvas');
			var x = e.clientX - tempCanvas.offsetLeft;
			var y = e.clientY - tempCanvas.offsetTop + $scope.windowScroll;
			log("Mouse click coordinates - [" + x + "," + y + "]");
			
			//clear selection
			$scope.selectedInstrumentID = null;
			$scope.selectedBarID = null;
			$scope.selectedItemID = null;
			
			if($scope.instruments.length < 1)
			{
				$scope.addInstrument("piano");
			}
			
			if($scope.instruments[0].bars.length < 1)
			{
				$scope.addBar();
			}
			
			//relative y
			var relY = y - $scope.windowScroll;
			var itemInstrument = {};
			var itemInstrumentIndex = null;
			var itemBar = {};
			var actionSelection = null
			
			for(var i = 0; i < $scope.lines.length; i++){
				if(   ($scope.lines[i].y - $scope.lineHeight/2)  < y 
				&&    ($scope.lines[i].y + $scope.getFullLineHeight($scope.lines[i]) + $scope.lineHeight/2)    >  y){
					actionSelection = "line";
					for(var j = 0; j <  $scope.lines[i].instruments.length; j++){
						if(	($scope.lines[i].instruments[j].y - $scope.lineHeight/2)   <   relY 
						&&   	($scope.lines[i].instruments[j].y + $scope.lineHeight + $scope.lineHeight/2)    > relY){
							actionSelection = "instrument";
							log("Instrument id - " + $scope.lines[i].instruments[j].id);
							itemInstrument = $scope.lines[i].instruments[j];
							itemInstrumentIndex = j;
						}
					}
					log("Line id - " + $scope.lines[i].id);
					
					var tempBars = $scope.lines[i].instruments[itemInstrumentIndex].bars;
					
					for(var j = 0; j < tempBars.length; j++){
						if(   (tempBars[j].x < x)   &&  ((tempBars[j + 1] == undefined || tempBars[i + 1] == null) || tempBars[j + 1].x > x )){
							actionSelection = "bar";
							log("Bar id - " + $scope.lines[i].instruments[0].bars[j].id);
							itemBar = $scope.lines[i].instruments[itemInstrumentIndex].bars[j];
							
							for(var k = 0; k < itemBar.items.length; k++){
								if(itemBar.items[k].x - 8 < x && x < itemBar.items[k].x + 8){
									log("Item id - " + itemBar.items[k].id);
									
									$scope.selectedInstrumentID = itemInstrument.id;
									$scope.selectedBarID = itemBar.id;
									$scope.selectedItemID = itemBar.items[k].id;
									actionSelection = "item";
								}
							}
						}
					}
				}
			}
			
			if(actionSelection == null){ return; }
			else if(actionSelection == "bar"){
				var itemY = ($scope.lineHeight/8) * Math.round((y - itemInstrument.y) / ($scope.lineHeight/8)) - $scope.windowScroll;
				$scope.addItem(itemY, itemInstrument.id, itemBar.id, "note");
			}
			else if(actionSelection == "item"){
				$scope.draw();
			}
		}
		
		$scope.newItemDuration = {num: 1, denom: 1};
		
		$scope.changeItemDuration = function(isLonger){
			if(isLonger){
				//if more than semibreve, do nothing
				if($scope.newItemDuration.num < 4){
					if($scope.newItemDuration.denom == 1){
						$scope.newItemDuration.num *= 2; 
					}else{
						$scope.newItemDuration.denom = Math.floor($scope.newItemDuration.denom / 2);
					}
				}
				
			}
			else{
				//if more than hemi-demi-semiquaver, do nothing. 
				//todo: extend further?
				if($scope.newItemDuration.denom < 16){
					if($scope.newItemDuration.num == 1){
						$scope.newItemDuration.denom *= 2; 
					}else{
						$scope.newItemDuration.num = Math.floor($scope.newItemDuration.num / 2);
					}
				}
			}
		}
		
		$scope.addItem = function(value, instrumentID, barID, type){
			var instrument = $scope.instruments.getItemFromID(instrumentID);
			var thisBar = instrument.bars.getItemFromID(barID);
			
			var noteCount = thisBar.items.countWhere(function(item){return (item.type == 'note' || item.type == undefined || item.type == null)});

			var totalNoteValues = thisBar.items.sum(function(item){return item.duration.num / item.duration.denom});
			var totalNoteValuesWithNewNote = totalNoteValues + ($scope.newItemDuration.num / $scope.newItemDuration.denom);
			var totalAllowedValue = thisBar.timeSignature.top * 4 / thisBar.timeSignature.bottom;
			
			
			if(totalNoteValues >= totalAllowedValue - 0.005){
				//enough or too many notes here!
				return;
			}
			// if this note will fill bar and this is last, add bar.
			else if( totalAllowedValue <= totalNoteValuesWithNewNote + 0.005 && /*noteCount > 2 && noteCount < 4 &&*/ instrument.bars.getLastItem().id == barID){
				$scope.addBar();
				//$scope.draw();
				//return;
				//thisBar = $scope.instruments[0].bars[$scope.instruments[0].bars.length - 1];
			}
			/*else if( noteCount > 3){
				//throw new Error("This bar is full already!");
				return;
			}*/
			
			if(type == null || type == undefined){
				type = "note";
			}
			
			var id = 0;
			var tempItems = thisBar.items;
			
			if(tempItems.length > 0) {
				id = tempItems[tempItems.length-1].id + 1;
			}
			
			//get uniquer id
			id = newID();
			
			var tempItem = {id: id, value: value, barID: thisBar.id, x: null, y: null, type: type, duration: {num: type == 'clef' ? 0 : $scope.newItemDuration.num, denom: $scope.newItemDuration.denom}};
			thisBar.items.push(tempItem);
			
			$scope.draw();
		}
		
		$scope.noteChange = function(e){
			if($scope.selectedItemID != null){

				var relevantInstrument = $scope.instruments.getItemFromID($scope.selectedInstrumentID);
				var relevantBar = relevantInstrument.bars.getItemFromID($scope.selectedBarID);
				var relevantItem = relevantBar.items.getItemFromID($scope.selectedItemID);
				
				if(e.which === 38){
					relevantItem.value -= 6;		
				}
				else if(e.which === 40){
					relevantItem.value += 6;
				}
				
				$scope.draw();
			}
		}
		
		$scope.moveLeft = function(relevantInstrument, currentSelection){
			var itemFound = null;
			while(itemFound == null){
				if(currentSelection.itemIndex != 0){
					currentSelection.itemIndex--;
				}
				else{
					if(currentSelection.barIndex != 0){
						currentSelection.barIndex--;
						while(relevantInstrument.bars[currentSelection.barIndex].items.length == 0){
							if(currentSelection.barIndex == 0){
								itemFound = false;
								return itemFound;
							}
							currentSelection.barIndex--;
						}
						currentSelection.itemIndex = relevantInstrument.bars[currentSelection.barIndex].items.length - 1;
					}
					else{
						itemFound = false;
						return itemFound;
					}
				}
						
				var currentItemType = relevantInstrument.bars[currentSelection.barIndex].items[currentSelection.itemIndex].type;
				if(currentItemType == "note" || currentItemType == "rest"){
					itemFound = true;
					$scope.selectedBarID = relevantInstrument.bars[currentSelection.barIndex].id;
					$scope.selectedItemID = relevantInstrument.bars[currentSelection.barIndex].items[currentSelection.itemIndex].id;
				}
			}
			return itemFound;
		}
		
		$scope.moveRight = function(relevantInstrument, currentSelection){
			var itemFound = null;
			while(itemFound == null){
				if(currentSelection.itemIndex != relevantInstrument.bars[currentSelection.barIndex].items.length - 1){
					currentSelection.itemIndex++;
				}else{
					if(currentSelection.barIndex != relevantInstrument.bars.length - 1){
						currentSelection.barIndex++;
						while(relevantInstrument.bars[currentSelection.barIndex].items.length == 0){
							if(currentSelection.barIndex == relevantInstrument.bars.length - 1){
								//todo: in future might considering adding a note in this case
								itemFound = false;
								return itemFound;
							}
							currentSelection.barIndex++;
						}
						currentSelection.itemIndex = 0;
					}
					else{
						itemFound = false;
						return itemFound;
					}
				}
			
				var currentItemType = relevantInstrument.bars[currentSelection.barIndex].items[currentSelection.itemIndex].type;
				if(currentItemType == "note" || currentItemType == "rest"){
					itemFound = true;
					$scope.selectedBarID = relevantInstrument.bars[currentSelection.barIndex].id;
					$scope.selectedItemID = relevantInstrument.bars[currentSelection.barIndex].items[currentSelection.itemIndex].id;
				}
			}
			return itemFound;
		}
		
		$scope.noteIndexChange = function(e){
			if($scope.selectedItemID != null){
				var relevantInstrument = $scope.instruments.getItemFromID($scope.selectedInstrumentID);
				var relevantBarIndex = relevantInstrument.bars.getIndexFromID($scope.selectedBarID);
				var relevantBar = relevantInstrument.bars[relevantBarIndex];
				var relevantItemIndex = relevantBar.items.getIndexFromID($scope.selectedItemID);
				//left keypress - move selected note one left
				//todo find previous NOTE. currently could be any item.
				var itemFound = null;
				var currentSelection = {barIndex: relevantBarIndex, itemIndex: relevantItemIndex};
				if(e.which === 37){
					itemFound = $scope.moveLeft(relevantInstrument, currentSelection);
				}
				//right keypress - move selected note one right
				//todo: add item if no item after this.
				else if(e.which === 39){
					itemFound = $scope.moveRight(relevantInstrument, currentSelection);
				}
				
				$scope.draw();
			}
		}
		
		$scope.changeDefaultTimeSignature = function(top, bottom){
			var previousTimeSig = {top: $scope.instruments.timeSignature.top, bottom: $scope.instruments.timeSignature.bottom};
			$scope.instruments.timeSignature = {top: top, bottom: bottom};
			for(var i = 0; i < $scope.instruments[0].bars.length; i++){
				for(var j = 0; j < $scope.instruments.length; j++){
					//when reaches point where time signature changes manually, stops, as all future bars will be in new time signature.
					if($scope.instruments[j].bars[i].timeSignature.top != previousTimeSig.top || $scope.instruments[j].bars[i].timeSignature.bottom != previousTimeSig.bottom){
						break;
					}
					$scope.instruments[j].bars[i].timeSignature = $scope.instruments.timeSignature;
				}
			}
			$scope.draw();
		}
		
		$scope.keyboardFunctions = function(e){
			if(e.which === 107 || e.which === 109){
				$scope.noteDurationChange(e);
			}
			else if(e.which === 46){
				$scope.deleteSelectedNote();
			}
		}
		
		//needs refactoring? there is also a remove function.
		$scope.deleteSelectedNote = function(){
			var relevantInstrument = $scope.instruments.getItemFromID($scope.selectedInstrumentID);
			if(relevantInstrument){
				var relevantBarIndex = relevantInstrument.bars.getIndexFromID($scope.selectedBarID);
				var relevantBar = relevantInstrument.bars[relevantBarIndex];
				if(relevantBar){
					var relevantItemIndex = relevantBar.items.getIndexFromID($scope.selectedItemID);
					var currentSelection = {barIndex: relevantBarIndex, itemIndex: relevantItemIndex};
					var itemFound = $scope.moveRight(relevantInstrument, currentSelection);
					if(!itemFound){
						currentSelection = {barIndex: relevantBarIndex, itemIndex: relevantItemIndex};
						itemFound = $scope.moveLeft(relevantInstrument, currentSelection);	
						if(!itemFound){
							$scope.selectedInstrumentID = null;
							$scope.selectedBarID = null;
							$scope.selectedItemID = null;
						}
					}
					relevantBar.items.splice(relevantItemIndex, 1);
					$scope.draw();
				}
			}
		}
		
		$scope.noteDurationChange = function(e){
			var relevantInstrument = $scope.instruments.getItemFromID($scope.selectedInstrumentID);
			var relevantBarIndex = relevantInstrument.bars.getIndexFromID($scope.selectedBarID);
			var relevantBar = relevantInstrument.bars[relevantBarIndex];
			var relevantItemIndex = relevantBar.items.getIndexFromID($scope.selectedItemID);
			// plus sign
			if(e.which === 107){
				//if more than semibreve, do nothing
				if(relevantBar.items[relevantItemIndex].duration.num < 4){
					if(relevantBar.items[relevantItemIndex].duration.denom == 1){
						relevantBar.items[relevantItemIndex].duration.num *= 2; 
					}else{
						relevantBar.items[relevantItemIndex].duration.denom = Math.floor(relevantBar.items[relevantItemIndex].duration.denom / 2);
					}
				}
			}
			//subtract
			else if(e.which === 109){
				//if more than hemi-demi-semiquaver, do nothing. 
				//todo: extend further?
				if(relevantBar.items[relevantItemIndex].duration.denom < 16){
					if(relevantBar.items[relevantItemIndex].duration.num == 1){
						relevantBar.items[relevantItemIndex].duration.denom *= 2; 
					}else{
						relevantBar.items[relevantItemIndex].duration.num = Math.floor(relevantBar.items[relevantItemIndex].duration.num / 2);
					}
				}
			}
			
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
		
		var lineSeperator = 200;
		
		
		$scope.drawInit = function(){
			if($scope.lines.length < 1)
			{
				$scope.lines.push({id: newID(), x: $scope.margin, y: lineSeperator, instruments: $scope.instruments, xSplitting: null});
			}
			else{
				$scope.lines[0].instruments = $scope.instruments;
				
				while($scope.lines.length < Math.ceil($scope.lines[0].instruments[0].bars.length / 5)){
					lineSeperator += 200;
					$scope.lines.push({id: newID(), x: $scope.margin, y: lineSeperator, instruments: [], xSplitting: null});
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
				
				// setting position of lines
				var tempLineYPos = 200;
				for(var i = 0; i < $scope.lines.length; i++){
					$scope.lines[i].y = tempLineYPos;
					
					var numVisibleInstruments = $scope.instruments.countWhere(function(item){
						return item.visible;	
					});
					
					tempLineYPos += (numVisibleInstruments - 1) * ($scope.instrumentHeight) + 2.5 * $scope.lineHeight;
				}

			}
			
			for(var i = 0; i < $scope.lines.length; i++){
				var tempLine = $scope.lines[i];
				
				var visibleInstruments = [];
				
				for(var j = 0; j < $scope.instruments.length; j++){
					if($scope.instruments[j].visible){
						visibleInstruments.push($scope.lines[i].instruments[j]);
					}
				}
				
				tempLine.instruments = visibleInstruments;
				
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
							if(tempItem.type != "clef"){
								tempItem.x = tempBar.x + tempItemX + 50;
								tempItem.y = tempBar.y;
								tempItemX += 50;
							}
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
			var bottomY = startY + $scope.getFullLineHeight(line);
			context.moveTo(startX, startY);
			context.lineTo(startX, bottomY);
			context.stroke();
			context.moveTo(finalX, startY);
			context.lineTo(finalX, bottomY);
			context.stroke();
		}
		
		$scope.drawInstrument = function(instrument){
			var tempY = parseInt(instrument.y);
			
			context.fillStyle = textColour;
			context.font = "bold 16px Arial";
			context.fillText(instrument.name, instrument.x + 5, tempY - 10);
			context.fillStyle = staveColour;
			
			for(var j = 0; j < 5; j++)
			{
				context.beginPath();
				context.moveTo(instrument.x, tempY);
				context.lineTo(canvas.width - $scope.margin, tempY);
				context.strokeStyle = staveColour;
				context.stroke();
				tempY += $scope.lineHeight / 4;
			}
		}
		
		$scope.drawBars = function(bars){
			var currentTimeSignature = {top: null, bottom: null};
			for(var i = 0; i < bars.length; i++)
			{
				if(currentTimeSignature.top != bars[i].timeSignature.top || currentTimeSignature.bottom != bars[i].timeSignature.bottom){
					$scope.drawTimeSignature(bars[i]);
					currentTimeSignature.top = bars[i].timeSignature.top;
					currentTimeSignature.bottom = bars[i].timeSignature.bottom;
				}
				$scope.drawBar(bars[i]);
			}
		}
		
		$scope.drawTimeSignature = function(bar){
			context.fillStyle = noteColour;
			log("Time signature font: " + "bold " + (2 * $scope.lineHeight/3) + "px Arial");
			context.font = "bold " + (2 * $scope.lineHeight/3) + "px Arial";
			context.fillText(bar.timeSignature.top, bar.x, bar.y + $scope.lineHeight/2);
			context.fillText(bar.timeSignature.bottom, bar.x, bar.y + $scope.lineHeight);
		}
		
		$scope.drawBar = function(bar){
			context.beginPath();
			context.strokeStyle = staveColour;
			context.moveTo(bar.x, bar.y);
			context.lineTo(bar.x, bar.y + $scope.lineHeight);
			context.stroke();
			for(var i = 0; i < bar.items.length; i++){
				$scope.drawItem(bar, bar.items[i]);
			}
		}
		
		$scope.drawItem = function(bar, item)
		{
			if(item.type == "note" || item.type == undefined || item.type == null){
				//draw the note
				context.beginPath();
				context.fillStyle = noteColour;
				context.arc(item.x, bar.y + item.value, 6, 0, 2 * Math.PI, false);
				
				if(item.duration && item.duration.denom == 1 && item.duration.num > 2){
					context.lineWidth = 2;
					context.strokeStyle = noteColour;
					context.stroke();
					context.lineWidth = 1;
				}
				else{
					if(item.duration && item.duration.denom == 1 && item.duration.num == 2){
						context.lineWidth = 2;
						context.strokeStyle = noteColour;
						context.stroke();
						context.lineWidth = 1;
					}
					else{
						context.fill();
					}
					
					//draw the stem
					context.beginPath();
					context.strokeStyle = noteColour;
					if(item.value >= $scope.lineHeight/2){
						context.moveTo(item.x + 5.5, bar.y + item.value);
						context.lineTo(item.x + 5.5, bar.y + item.value - 36);
						context.stroke();
						
						if(item.duration && item.duration.num == 1 && item.duration.denom > 1){
							var tailX = item.x + 5.5;
							var tailY = bar.y + item.value - 36;
							var tailController = item.duration.denom;
							var tailNum = 0;
							while(tailController > 1){
								context.beginPath();
								context.moveTo(tailX, tailY);
								context.bezierCurveTo(tailX + 1, tailY + 10, tailX + 15, tailY + 13, tailX + 7, tailY + 25);
								context.bezierCurveTo(tailX + 13, tailY + 13, tailX, tailY + 8, tailX,  tailY + 15);
								context.lineTo(tailX, tailY);
								context.fill();
								context.stroke();
								tailController = Math.floor(tailController / 2);
								if(tailNum == 0){tailY += 10;}
								else if(tailNum == 1){tailY -= 20;}
								else{tailY -= 10;}
								tailNum++;
							}
						}
					}else{
						context.moveTo(item.x - 5.5, bar.y + item.value);
						context.lineTo(item.x - 5.5, bar.y + item.value + 36);
						context.stroke();
						
						if(item.duration && item.duration.num == 1 && item.duration.denom > 1){
							var tailX = item.x - 5.5;
							var tailY = bar.y + item.value + 36;
							var tailController = item.duration.denom;
							var tailNum = 0;
							while(tailController > 1){
								context.beginPath();
								context.moveTo(tailX, tailY);
								context.bezierCurveTo(tailX + 1, tailY - 10, tailX + 15, tailY - 13, tailX + 7, tailY - 25);
								context.bezierCurveTo(tailX + 13, tailY - 13, tailX, tailY - 8, tailX,  tailY - 15);
								context.lineTo(tailX, tailY);
								context.fill();
								context.stroke();
								tailController = Math.floor(tailController / 2);
								if(tailNum == 0){tailY -= 10;}
								else if(tailNum == 1){tailY += 20;}
								else{tailY += 10;}
								tailNum++;
							}
						}
					}
				}
				
				// draw mark showing which item is selected.
				if($scope.selectedItemID == item.id){
					context.beginPath();
					context.arc(item.x,bar.y + item.value,12,0,2*Math.PI);
					context.strokeStyle = '#1DDD10';
					context.stroke();
					
					context.strokeStyle = staveColour;
				}
			}
			else if(item.type == "rest"){
				
			}
			else if(item.type == "clef"){
				
			}
			
			/* **********Deprecated method of drawing time signature**********
			else if(item.type == "timeSignature"){
				context.fillStyle = noteColour;
				log("Time signature font: " + "bold " + (2 * $scope.lineHeight/3) + "px Arial");
				context.font = "bold " + (2 * $scope.lineHeight/3) + "px Arial";
				context.fillText(item.value.top, bar.x, bar.y + $scope.lineHeight/2);
				context.fillText(item.value.bottom, bar.x, bar.y + $scope.lineHeight);
			}
			*/
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
				//go through all on load user functions
				for(var i = 0; i < userFunctions.lockTheDoor.length; i++){
					if(userFunctions.lockTheDoor[i].type.name == "code"){
						eval( userFunctions.lockTheDoor[i].code);
					}
				}
			
				if(time == 80){
					context.fillStyle = noteColour;
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
					drawOn = true;
					$scope.addBar();
					$scope.addItem("treble", $scope.instruments[0].id, $scope.instruments[0].bars[0].id, "clef");
					//Deprecated method of adding time signature:
					//$scope.addItem($scope.instruments.timeSignature, $scope.instruments[0].id, $scope.instruments[0].bars[0].id, "timeSignature");
					$scope.draw();

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
		
		$scope.submitBugReport = function(){
			if($scope.bugMessage == "" || $scope.bugMessage == null){
				alert("Please write some information on the bug before submitting.");
				return;
			}
			var currentUser = "Anonymous";
			var relevantThreadID = newID();
			
			var postObject = {user: currentUser, threadID: relevantThreadID,  message: $scope.bugMessage, time: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')};
			var threadObject = {id: relevantThreadID, subject: "Bug: #" + relevantThreadID,	posts: []}
			
			var stringifiedThread = JSON.stringify(threadObject);
			$http({method: "POST", url: serverURL + "/threads", data: stringifiedThread});
			
			var stringifiedPost = JSON.stringify(postObject);
			$http({method: "POST", url: serverURL + "/posts", data: stringifiedPost});
			
			$scope.bugMessage = "";
			$scope.bugReport = false;
		}
	});
	//.factory('Note', function( line ){	});
	
// https://medium.com/opinionated-angularjs/angular-model-objects-with-javascript-classes-2e6a067c73bc
// http://demisx.github.io/angularjs/2014/09/14/angular-what-goes-where.html
// https://docs.angularjs.org/guide/services
// http://viralpatel.net/blogs/angularjs-service-factory-tutorial/


// http://jsfiddle.net/r4TMq/71/
