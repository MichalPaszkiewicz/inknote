developerKingdomModule.
	controller("layoutCtrl", function layoutCtrl($scope, $window){

		$scope.setSize = function(){
			return ($window.innerWidth <= 1410);
		}
		
		$scope.getSize = function(){
			return ($window.innerWidth <= 1410)
		}
		
		$scope.fullWidth = false || getSize();

		
		var w = angular.element($window);
  
		w.bind('resize', function () {
			$scope.setSize();
		});
	});
