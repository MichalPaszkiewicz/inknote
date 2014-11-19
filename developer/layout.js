developerKingdomModule.
	controller("layoutCtrl", function layoutCtrl($scope, $window){

		$scope.fullWidth = false || getSize();

		$scope.setSize = function(){
			return ($window.innerWidth <= 1410);
		}
		
		$scope.getSize = function(){
			return ($window.innerWidth <= 1410)
		}
		
		
		var w = angular.element($window);
  
		w.bind('resize', function () {
			$scope.setSize();
		});
	});
