//todo write angular scripts for developer page.


var developerKingdomModule = angular.module('app', []).
	controller("forumCtrl", function forumCtrl($scope, $window){
		
		$scope.forum = {
			threads: [{subject: "blah blah blah", posts: [{user: "user1", time: new Date(), message: "hi how u doing"}, {user: "user2", time: new Date(), message: "lol wassup"}]},
				{subject: "how to add your own functions", posts: [{user: "user1", time: new Date(), message: "asdfasdf"}, {user: "user2", time: new Date(), message: "j jajajajajajh"}]}]
		};
		
		$scope.currentThread = {};
		$scope.currentThreadOn = false;
		
		$scope.setThread = function(thread){
			$scope.currentThread = thread;
			$scope.currentThreadOn = true;
		}
		
		$scope.backToForum = function(){
			$scope.currentThreadOn = false;
		}
		
		$scope.addPost = function(thread){
			if($scope.currentUser == "" || $scope.currentUser == null){
				$scope.currentUser = "Guest";
			}
			$scope.currentThread.posts.push({user: $scope.currentUser, message: $scope.newPost});
			
			$scope.newPost = "";
		}
		
		$scope.currentUser = "";
		$scope.newPost = "";
	});
