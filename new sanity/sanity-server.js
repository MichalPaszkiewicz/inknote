var Message = function(type, data){
	var type = type;
	var data = data;
	return JSON.stringify({type: type, data: data});
}

var Types = {
	Message: 0,
	Script: 1,
	Connect: 2	
}

var WebSocketServer = require('ws').Server;

var editors = [];
var previews = [];

function sendTo(msg, To){
	for(var i = 0; i < previews.length; i++){
		if(previews[i].ID == To){
			previews[i].ws.send(msg);
		}
	}
}

function sendToAll(msg){
	for(var i = 0; i < previews.length; i++){
		previews[i].ws.send(msg);
	}
}

var wss = new WebSocketServer({port: 8080});

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
		try{
		var msg = JSON.parse(message);
		}
		catch(e){
			console.log("Error. Incorrect message:");
			console.log("\t" + message);
			return;
		}
		
		if(msg.type === null || msg.type === undefined){
			console.log("Incorrect message:");
			console.log("\t" + message);
			return;
		}
		
		switch(msg.type){
			case Types.Connect:
				if(msg.isEditor === true){
					editors.push({ID: msg.data.ID, ws: ws});
					console.log("Editor connected");
				}
				if(msg.isEditor === false){
					previews.push({ID: msg.data.ID, ws: ws});
					console.log("Preview connected");
				}
				break;
			case Types.Message:
				if(msg.To){
					
				}
				else{
					sendToAll(message);
				}
				break;
			case Types.Script:
				if(msg.To){
					
				}
				else{
					sendToAll(message);
				}
				break;
		}
    });
    ws.send(Message(Types.Message, "connected"));
	
	
	ws.on("close", function close(){
		var newEditors = [];
		var newPreviews = [];
		for(var i = 0; i < editors.length; i++){
			if(editors[i].ws == ws){
				console.log("editor closed: " + editors[i].ID);
			}
			else{
				newEditors.push(editors[i]);
			}
		}
		for(var i = 0; i < previews.length; i++){
			if(previews[i].ws == ws){
				console.log("preview closed: " + previews[i].ID);
			}
			else{
				newPreviews.push(previews[i]);
			}
		}
		
		editors = newEditors;
		previews = newPreviews;
	});
});


console.log("Sanity server running");