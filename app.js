var http = require("http")
var ws = require("nodejs-websocket")
var fs = require("fs")

var historyMaxCount = 30
var historyMessage = []

http.createServer(function (req, res) {
	fs.createReadStream("room.html").pipe(res)
}).listen(8080)

var server = ws.createServer(function (connection) {
	connection.nickname = null
	connection.on("text", function (str) {
		if (connection.nickname === null) {
			connection.nickname = str
			broadcast("["+str+"] 進入聊天室")
			console.log("["+str+"] 進入聊天室");

			if(historyMessage.length > 0) {
				historyMessage.forEach(function (str) {
					connection.sendText(str)
				})
			}

		} else
			broadcast("["+connection.nickname+"] ： "+str)
			console.log("["+connection.nickname+"] ： "+str);

			if(historyMessage.length > historyMaxCount){
				var newHistoryMessage = []
				for (var i = historyMaxCount-20; i < historyMaxCount; i++) {
					newHistoryMessage.push(historyMessage[i])
				}
				historyMessage = newHistoryMessage;

			}else {
				historyMessage.push("["+connection.nickname+"] ： "+str)
			}
	})

	connection.on("close", function () {
		broadcast("["+connection.nickname+"] 離開聊天室")
		console.log("["+connection.nickname+"] 離開聊天室");
	})

	connection.on("error", function (error) {
		console.log("error : "+error);
	})

})
server.listen(8081)

function broadcast(str) {
		server.connections.forEach(function (connection) {
			connection.sendText(str)
		})
}
