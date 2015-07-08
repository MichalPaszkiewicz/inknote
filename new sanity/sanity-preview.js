var isEditor = false;

var Message = function(type, data){
	return JSON.stringify({type: type, data: data, isEditor: isEditor});
}

var Types = {
	Message: 0,
	Script: 1,
	Connect: 2	
}

var ws = new WebSocket('ws://localhost:8080');

ws.onopen = function() {
    ws.send(Message(Types.Connect, {ID: 1}));
};

ws.onmessage = function(message) {
	var msg = JSON.parse(message.data);
    switch(msg.type){
		case Types.Message:
			console.log(msg.data);
			break;
		case Types.Script:
			eval(msg.data);
			break;
	}
};