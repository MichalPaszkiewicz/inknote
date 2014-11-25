//todo write angular scripts for developer page.


var developerKingdomModule = angular.module('app', []).
	controller("forumCtrl", function forumCtrl($scope, $window, $http){
		
		$scope.forum = {
			threads: [{subject: "blah blah blah", posts: [{user: "user1", time:  (new Date()).toLocaleString(), message: "hi how u doing"}, {user: "user2", time:  (new Date()).toLocaleString(), message: "lol wassup"}]},
				{subject: "how to add your own functions", posts: [{user: "user1", time: (new Date()).toLocaleString(), message: "asdfasdf"}, {user: "user2", time:  (new Date()).toLocaleString(), message: "j jajajajajajh"}]}]
		};
		
		$scope.fetch = function(){
			var additionalPosts = [];	
			$http({method: "GET", url: "http://localhost:3000/posts"})
				.success(function(data, status){
					additionalPosts = data;
					console.log(additionalPosts);
				})
				.error(function(data, status){
					additionalPosts = data || "Request failed";
					console.log(additionalPosts);
				});
		};
		
		$scope.fetch();
		
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
			$scope.currentThread.posts.push({user: $scope.currentUser, message: $scope.newPost, time: (new Date()).toLocaleString()});
			
			$scope.newPost = "";
		}
		
		$scope.addThread = function(){
			if($scope.currentUser == "" || $scope.currentUser == null){
				$scope.currentUser = "Guest";
			}
			$scope.forum.threads.push({
				subject: $scope.newSubject,
				posts: [{user: $scope.currentUser, message: $scope.newPost, time: (new Date()).toLocaleString()}]
			});
			
			$scope.newSubject = "";
			$scope.newPost = "";
		}
		
		$scope.currentUser = "";
		$scope.newPost = "";
		$scope.newSubject = "";
		$scope.predicate = '';
	});
