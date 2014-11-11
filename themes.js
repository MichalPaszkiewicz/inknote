canvasModule.
	controller("themeControl", function themeCtrl($scope){
		$scope.themes = [
			{name: "standard", url: "styles.css"},
			{name: "dark", url: "themes/dark/styles.css"},
			{name: "light", url: "themes/light/styles.css"},
			{name: "sepia", url: "themes/sepia/styles.css"}
		];
		
		$scope.layouts = [
			{name: "top menu", url: "layouts/topmenu/layout.css"},
			{name: "side menu", url: "layouts/sidemenu/layout.css"}
		];
		
		$scope.currentCss = "styles.css";
		$scope.layoutCss = "layouts/topmenu/layout.css";
		
		$scope.setTheme = function(theme){
			$scope.currentCss = theme.url;
		}
		
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
				url: link
			};
			
			$scope.currentCss = newTheme.url;
			$scope.themes.push(newTheme);
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
