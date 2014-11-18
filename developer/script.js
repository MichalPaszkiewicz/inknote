//todo write angular scripts for developer page.


var forumModule = angular.module('app', []).
	controller("forumCtrl", function forumCtrl($scope, $window){
		
		$scope.forum = {
			threads: [{subject: "blah blah blah", posts: [{user: "user1", message: "hi how u doing"}, {user: "user2", message: "lol wassup"}]},
				{subject: "how to add your own functions", posts: [{user: "user1", message: "asdfasdf"}, {user: "user2", message: "j jajajajajajh"}]}]
		};
		
		$scope.currentThread = {};
		
		$scope.setThread = function(thread){
			$scope.currentThread = thread;
		}
	});
