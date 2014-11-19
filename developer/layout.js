developerKingdomModule.
	controller("layoutCtrl", function layoutCtrl($scope, $window){

		$scope.setSize = function(){
			$scope.fullWidth = ($window.innerWidth <= 1410);
		}
		
		$scope.getSize = function($window){
			return ($window.innerWidth <= 1410)
		}
		
		$scope.fullWidth = false || $scope.getSize();

		
		var w = angular.element($window);
  
		w.bind('resize', function () {
			$scope.setSize();
		});
	});
