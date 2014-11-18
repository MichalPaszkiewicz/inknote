developerKingdomModule.
	controller("guideCtrl", function guideCtrl($scope, $window, $sce){
		
		$scope.sections = [{name: "Introduction", htmlText: "<p>This site is a guide to all developers wishing to contribute to or integrate with the inknote project.</p>"
								+ "<p>The aim of this project is to create a free, open source, browser based scoring program that will be both user and developer friendly.</p>"
		},{name: "Adding plugins", htmlText: "<h3>Na na na na na nana heeeeeey jude</h3><h3>Hey judey judey jude</h3>"}];
		
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
