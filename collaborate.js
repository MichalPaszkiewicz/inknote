angular.module('peerJS', []).
	controller("peerJS", function peerJS($scope){
		// Connect to PeerJS, have server assign an ID instead of providing one
		// Showing off some of the configs available with PeerJS :).
		var peer = new Peer({
		    // Set API key for cloud server (you don't need this if you're running your
		    // own.
		    key: '9t3v4nsdk6ueg66r',
		
		    // Set highest debug level (log everything!).
		    debug: 3,
		
		    // Set a logging function:
		    logFunction: function() {
		        var copy = Array.prototype.slice.call(arguments).join(' ');
		        $('.log').append(copy + '<br>');
		    },
		
		    // Use a TURN server for more network support
		    config: {'iceServers': [
		      { url: 'stun:stun.l.google.com:19302' }
		    ]} /* Sample servers, please use appropriate ones */
		});
		
		var connectedPeers = {};
	
		
	
	
	
	
	});
