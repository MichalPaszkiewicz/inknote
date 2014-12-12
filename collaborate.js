angular.module('peerJS', []).
	controller("peerJS", function peerJS($scope){
		// Connect to PeerJS, have server assign an ID instead of providing one
		// Showing off some of the configs available with PeerJS :).
		var peer = new Peer({
			// Set API key for cloud server 
		    	key: '9t3v4nsdk6ueg66r',
		
			// Set highest debug level (log everything!).
			debug: 3,
		
			// Set a logging function:
			logFunction: function() {
				var copy = Array.prototype.slice.call(arguments).join(' ');
				console.log(copy);
			}
		});
		
		//current client connection id.
		$scope.myID = null;
		
		//object holding all client ids.
		var connectedPeers = {};
		
		$scope.collaboratorMessages = [];
	
		// Show this peer's ID.
		peer.on('open', function(id){
			$scope.myID = id;
		});
	
		// Await connections from others
		peer.on('connection', connect);
	
		// Handle a connection object.
		function connect(c) {
			
		    // Handle a chat connection.
			if (c.label === 'chat') {
				$scope.collaboratorMessages.push({peer: c.peer, message: c.peer + " has connected."});

				c.on('data', function(data) {
					$scope.collaboratorMessages.push({peer: c.peer, message: data});
			        });
				
				c.on('close', function() {
					alert(c.peer + ' has left the chat.');
					delete connectedPeers[c.peer];
			        });
			} else if (c.label === 'file') {
				c.on('data', function(data) {
					// If we're getting a file, create a URL for it.
					if (data.constructor === ArrayBuffer) {
						var dataView = new Uint8Array(data);
						var dataBlob = new Blob([dataView]);
						var url = window.URL.createObjectURL(dataBlob);
						$scope.collaboratorMessages.push({peer: c.peer, message: c.peer + ' has sent you a <a target="_blank" href="' + url + '">file</a>.'});
					}
				});
			}
		    
			if(location.search.length == 0)
			{
				setTimeout(function(){sendSettings()},500);
			}
		}
	
	
	});
