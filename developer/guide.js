developerKingdomModule.
	controller("guideCtrl", function guideCtrl($scope, $window){
		
		$scope.sections = [{name: "Introduction", html: "blah blah blah <h1>Lololol</h1>"},{name: "Adding plugins", html: "<h3>Na na na na na nana heeeeeey jude</h3><h3>Hey judey judey jude</h3>"}];
		
		$scope.setSection = function(thread){
			$scope.currentThread = thread;
			$scope.currentThreadOn = true;
		}
		
		$scope.currentSection = {};
		$scope.currentSectionOn = false;
		
	})
