canvasModule.
	controller("themeControl", function themeCtrl($scope){
		$scope.themes = [
			{name: "standard", url: "styles.css", staveColour: "black", noteColour: "red", textColour: "green"},
			{name: "dark", url: "themes/dark/styles.css", staveColour: "white", noteColour: "red", textColour: "yellow"},
			{name: "light", url: "themes/light/styles.css", staveColour: "black", noteColour: "red", textColour: "green"},
			{name: "sepia", url: "themes/sepia/styles.css", staveColour: "black", noteColour: "red", textColour: "green"}
		];
		
		$scope.layouts = [
			{name: "top menu", url: "layouts/topmenu/layout.css"},
			{name: "side menu", url: "layouts/sidemenu/layout.css"}
		];
		
		var setLocalStyle = function(value){
			localStorage.setItem("inknote-theme", value);
		}
		
		$scope.setTheme = function(theme){
			$scope.currentCss = theme.url;
			staveColour = theme.staveColour;
			noteColour = theme.noteColour;
			textColour = theme.textColour;
			setLocalStyle(theme.url);
		}
		
		$scope.currentCss = "styles.css";
		
		var getLocalStyle = function(){
			var storedStyleSheet = localStorage.getItem("inknote-theme");
			
			if(storedStyleSheet == null || storedStyleSheet == undefined){
				$scope.currentCss = "styles.css";
				return;
			}
			
			for(var i = 0; i < $scope.themes.length; i++){
				if($scope.themes[i].url == storedStyleSheet){
					$scope.setTheme($scope.themes[i]);
					return;
				}	
			}

			$scope.currentCss = storedStyleSheet;
		}
		
		getLocalStyle();
		
		$scope.layoutCss = "layouts/topmenu/layout.css";
		
		var getName = function(link){
			if(link.indexOf("?") != -1){
				return link.substr(link.lastIndexOf("/") + 1, link.indexOf("?") - link.lastIndexOf("/") - 1);
			}
			else if(link.indexOf("/") != -1){
				return link.substr(link.lastIndexOf("/") + 1);
			}
			else{
				return link;
			}
		}
		
		$scope.addTheme = function(link){
			var newTheme = {
				name: getName(link),
				url: link,
				staveColour: "black", 
				noteColour: "red", 
				textColour: "green"
			};
			
			$scope.currentCss = newTheme.url;
			$scope.themes.push(newTheme);
			setLocalStyle(newTheme.url);
		}
		
		$scope.setLayout = function(layout){
			$scope.layoutCss = layout.url;
		}
		
		$scope.addLayout = function(link){
			var newLayout = {
				name: getName(link),
				url: link
			};
			
			$scope.layoutCss = newLayout.url;
			$scope.layouts.push(newLayout);
		}
	});
