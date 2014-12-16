//todo write angular scripts for developer page.


var developerKingdomModule = angular.module('app', []).
	controller("forumCtrl", function forumCtrl($scope, $window, $http){
		
		function newID(){
			return (new Date).getTime() + "" + Math.floor(100 * Math.random());
		}
		
		$scope.forum = {
			threads: []
		};
		
		var getThreadIndexFromID = function(id){
			for(var i = 0; i < $scope.forum.threads.length; i++){
				if($scope.forum.threads[i].id == id){
					return i;
				}	
			}
		}
		
		$scope.getPosts = function(){
			var additionalPosts = [];
			$http({method: "GET", url: serverURL + "/posts"})
				.success(function(data, status){
					additionalPosts = data;
					console.log("Additional posts: " + additionalPosts);
				
				for(var i = 0; i < additionalPosts.length; i++){
					var relevantThreadIndex = getThreadIndexFromID(additionalPosts[i].threadID);
					$scope.forum.threads[relevantThreadIndex].posts.push(additionalPosts[i]);
				}
			})
			.error(function(data, status){
				additionalPosts = data || "Request failed";
				console.log(additionalPosts);
			});
		};
		
		$scope.fetch = function(){
			var additionalThreads = [];
			
			$http({method: "GET", url: serverURL + "/threads"})
			.success(function(data, status){
				additionalThreads = data;
				console.log("Additional threads: " + additionalThreads)
				for(var i = 0; i < additionalThreads.length; i++){
					$scope.forum.threads.push(additionalThreads[i]);
				}
				$scope.getPosts();
			}).error(function(data, status){
				console.log("Threads Fail");	
			});
		};
		
		$scope.fetch();
		
		$scope.currentThread = {};
		$scope.currentThreadOn = false;
		$scope.newThreadOn = false;
		
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
			
			var postObject = {user: $scope.currentUser, threadID: thread.id, message: $scope.newPost, time: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')};
			
			$scope.currentThread.posts.push(postObject);
			
			var stringifiedPost = JSON.stringify(postObject);
			$http({method: "POST", url: serverURL + "/posts", data: stringifiedPost})

			$scope.newPost = "";
		}
		
		$scope.addThread = function(){
			if($scope.currentUser == "" || $scope.currentUser == null){
				$scope.currentUser = "Guest";
			}
			
			var relevantThreadID = newID();
			
			var postObject = {user: $scope.currentUser, threadID: relevantThreadID,  message: $scope.newPost, time: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')};
			var threadObject = {id: relevantThreadID, subject: $scope.newSubject,	posts: []}
			
			var stringifiedThread = JSON.stringify(threadObject);
			$http({method: "POST", url: serverURL + "/threads", data: stringifiedThread});
			
			var stringifiedPost = JSON.stringify(postObject);
			$http({method: "POST", url: serverURL + "/posts", data: stringifiedPost});
			
			threadObject.posts.push(postObject);
			$scope.forum.threads.push(threadObject);
			
			$scope.newSubject = "";
			$scope.newPost = "";
			$scope.newThreadOn = false;
		}
		
		$scope.isFixed = function(posts){
			if(posts == undefined){return false;}
			for(var i = 0; i < posts.length; i++){
				if(posts[i].message.toLowerCase().indexOf('fixed') != -1 && posts[i].user == "Admin"){
					return true;
				}
			}
			return false;
		}
		
		$scope.currentUser = "";
		$scope.newPost = "";
		$scope.newSubject = "";
		$scope.predicate = '';
	});
