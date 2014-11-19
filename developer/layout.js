developerKingdomModule.
	controller("layoutCtrl", function layoutCtrl($scope, $window){

		$scope.setSize = function(){
			$scope.fullWidth = ($window.innerWidth <= 1410);
		}
		
		$scope.getSize = function(){
			return ($window.innerWidth <= 1410)
		}
		
		$scope.fullWidth = $scope.getSize();

		
		var w = angular.element($window);
  
		w.bind('resize', function () {
			$scope.setSize();
			$scope.$apply( $scope.fullWidth );
		});
	});
