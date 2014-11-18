developerKingdomModule.
	controller("guideCtrl", function guideCtrl($scope, $window){
		
		$scope.sections = [{name: "Introduction"},{name: "Adding plugins"}];
		
		$scope.currentSection = {};
		$scope.currentSectionOn = false;
	})
