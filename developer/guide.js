developerKingdomModule.
	controller("guideCtrl", function guideCtrl($scope, $window, $sce){
		
		$scope.sections = [{name: "Introduction", htmlText: "blah blah blah <h1>Lololol</h1>"},{name: "Adding plugins", htmlText: "<h3>Na na na na na nana heeeeeey jude</h3><h3>Hey judey judey jude</h3>"}];
		
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
