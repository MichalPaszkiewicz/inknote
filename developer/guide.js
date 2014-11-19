developerKingdomModule.
	controller("guideCtrl", function guideCtrl($scope, $window, $sce){
		
		$scope.sections = [{name: "Introduction", htmlText: "<p>This site is a guide to all developers wishing to contribute to or integrate with the inknote project.</p>"
								+ "<p>The aim of this project is to create a free, open source, browser based scoring program that will be both user and developer friendly.</p>"
		},
		{name: "Debugging", htmlText: "<h3>Turn it on</h3>" 
			+ "<p>To turn debugging mode on, go to</p>"
			+ "<p class='centalic'>Developers → Log → On</p>"
			+ "<h3>Change style</h3>"
			+ "<p>To change debugging style, go to</p>"
			+ "<p class='centalic'>Developers → Log → UI/Console</p>"
			+ "<p>UI mode will use alertify logs to display the log, while console will print the logs to the console. Please be aware that when using UI logging, there is no record of the logs.</p>"
		},
		{name: "Adding plugins", htmlText: "<h3>Na na na na na nana heeeeeey jude</h3><h3>Hey judey judey jude</h3>"}];
		
		$scope.currentSection = {};
		$scope.currentSectionOn = false;
		
		$scope.setSection = function(section){
			$scope.currentSection = section;
			$scope.currentSectionOn = true;
		}
		
		$scope.backToSections = function(){
			$scope.currentSectionOn = false;
		}
		
		$scope.to_trusted = function(html_code) {
		    return $sce.trustAsHtml(html_code);
		}
	})
