var http = require("http")
var ws = require("nodejs-websocket")
var fs = require("fs")


//KEY
var alice = "alice123"
var kefan = "kefan456"
var pi		= "pi789"
var doris = "doris123"
var allen	= "allen64347"
var joseph = "joseph789"
var ivan  = "ivan123"
var dannies = "dannies456"
var jimmy = "jimmy789"

//NAME
var ALICE = "硝戎魚"
var KEFAN = "剪嗑煩"
var PI		= "湃萃嗑"
var DORIS = "躲粒撕"
var ALLEN	= "誒任"
var JOSEPH = "阿廖"
var IVAN  = "挨悶"
var DANNIES = "亡尾菌"
var JIMMY = "你加薪"

var historyMaxCount = 30
var historyMessage = []

http.createServer(function (req, res) {
	fs.createReadStream("room.html").pipe(res)
}).listen(8080)

var server = ws.createServer(function (connection) {
	connection.nickname = null
	connection.on("text", function (str) {

		if (connection.nickname === null) {
			//Check User Login
			var key = checkUserLogin(str)
			if (key == null) {
				return connection.sendText("loginFail")

				connection.nickname = key
				broadcast("["+key+"] 進入聊天室")
				console.log("["+key+"] 進入聊天室");

				if(historyMessage.length > 0) {
					historyMessage.forEach(function (key) {
						connection.sendText(key)
					})
				}
			}
		}else{
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


function checkUserLogin(key) {
	// body...

	if (key == alice){
		return ALICE
	}else if(key == kefan){
		return KEFAN
	}else if (key == pi) {
		return PI
	}else if (key == doris) {
		return DORIS
	}else if (key == allen) {
		return ALLEN
	}else if (key == joseph) {
		return JOSEPH
	}else if (key == ivan) {
		return IVAN
	}else if (key == dannies) {
		return DANNIES
	}else if (key == jimmy) {
		return JIMMY
	}else {
		return null
	}
}
