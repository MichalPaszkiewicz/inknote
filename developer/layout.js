developerKingdomModule.
	controller("layoutCtrl", function layoutCtrl($scope, $window){

		$scope.getSize = function(){
			if($window.innerWidth <= 1410){
				return "width: 100%";
			}
			else{
				return "width: 50%";
			}
		}
	});
