//todo write angular scripts for developer page.


var developerKingdomModule = angular.module('app', []).
	controller("forumCtrl", function forumCtrl($scope, $window, $http){
		
		$scope.forum = {
			threads: [{subject: "blah blah blah", posts: []},
				{subject: "how to add your own functions", posts: []}
			]
		};
		
		$scope.fetch = function(){
			var additionalPosts = [];	
			$http({method: "GET", url: "http://localhost:3000/posts"})
				.success(function(data, status){
					additionalPosts = data;
					console.log(additionalPosts);
					
					for(var i = 0; i < additionalPosts.length; i++){
						$scope.forum.threads[0].posts.push(additionalPosts[i]);
					}
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
			
			var postObject = {user: $scope.currentUser, message: $scope.newPost, time: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')};
			
			$scope.currentThread.posts.push(postObject);
			
			var stringifiedPost = JSON.stringify(postObject);
			$http({method: "POST", url: "http://localhost:3000/posts", data: stringifiedPost})

			$scope.newPost = "";
		}
		
		$scope.addThread = function(){
			if($scope.currentUser == "" || $scope.currentUser == null){
				$scope.currentUser = "Guest";
			}
			$scope.forum.threads.push({
				subject: $scope.newSubject,
				posts: [{user: $scope.currentUser, message: $scope.newPost, time: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]
			});
			
			$scope.newSubject = "";
			$scope.newPost = "";
		}
		
		$scope.currentUser = "";
		$scope.newPost = "";
		$scope.newSubject = "";
		$scope.predicate = '';
	});
