var http = require("http")
var ws = require("nodejs-websocket")
var fs = require("fs")

http.createServer(function (req, res) {
	fs.createReadStream("room.html").pipe(res)
}).listen(8080)

var server = ws.createServer(function (connection) {
	connection.nickname = null
	connection.on("text", function (str) {
		if (connection.nickname === null) {
			connection.nickname = str
			broadcast(str+" entered")
			console.log(str+" entered");
		} else
			broadcast("["+connection.nickname+"] "+str)
			console.log("["+connection.nickname+"] "+str);
	})
	connection.on("close", function () {
		broadcast(connection.nickname+" left")
		console.log(connection.nickname+" left");
	})
})
server.listen(8081)

function broadcast(str) {
	server.connections.forEach(function (connection) {
		connection.sendText(str)
	})
}