developerKingdomModule.
	controller("guideCtrl", function guideCtrl($scope, $window, $sce){
		
		$scope.sections = [{name: "Introduction", htmlText: "<p>This site is a guide to all developers wishing to contribute to or integrate with the inknote project.</p>"
								+ "<p>The aim of this project is to create a free, open source, browser based scoring program that will be both user and developer friendly.</p>"
		},
		{name: "Source code", htmlText: "<h3>GitHub</h3>" 
			+ "<p>You can find the source code over <a href='https://github.com/MichalPaszkiewicz/inknote'>here</a>.</p>"
			+ "<p>If you see any bugs, or would like to improve the code or add some features, you are invited to help out with the project. Please go ahead and fork the code, pushing any changes.</p>"
			+ "<p>Once you have proved yourself trustworthy, by pushing sufficient good code or otherwise, you will be added as a contributor to the project to make things easier for you and give you more power over the code.</p>"
			+ "<p>If you have any questions regarding changes you would like to make, please go ahead and post them in the forum on this page."
			+ "<h3>Licensing</h3>"
			+ "<p>This project is entirely open source, so feel free to use any or all of it. You have every right to do so, so long as you do not try to sell the code you get from here as a product.</p>"
		},
		{name: "Debugging/Logging", htmlText: "<h3>Turn it on</h3>" 
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
		
		$scope.getCurrentSectionIndex = function(){
			for(var i = 0; i < $scope.sections.length; i++){
				if($scope.sections[i] == $scope.currentSection){
					return i;
				}
			}
		}
		
		$scope.currentSectionIsFirst = function(){
			return $scope.getCurrentSectionIndex() == 0;
		}
		
		$scope.previousSection = function(){
			$scope.currentSection = $scope.sections[$scope.getCurrentSectionIndex() - 1];
		}
		
		$scope.currentSectionIsLast = function(){
			return $scope.getCurrentSectionIndex() == $scope.sections.length - 1;
		}
		
		$scope.nextSection = function(){
			$scope.currentSection = $scope.sections[$scope.getCurrentSectionIndex() + 1];
		}
	})
