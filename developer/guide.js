developerKingdomModule.
	controller("guideCtrl", function guideCtrl($scope, $window, $sce, $http){
		
		$scope.sections = [];
		
		$scope.getForumSections = function(){
			var additionalGuides = [];	
			$http({method: "GET", url: "http://localhost:3000/guide"})
				.success(function(data, status){
					additionalGuides = data;
					
					for(var i = 0; i < additionalGuides.length; i++){
						$scope.sections.push(additionalGuides[i]);
					}
				})
				.error(function(data, status){
					additionalGuides = data || "Request failed";
					console.log(additionalGuides);
				});
		};
		
		$scope.getForumSections();
		
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
