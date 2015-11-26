var net = require('net');
var dict = require('dict');
var connections = new dict()
var clients     = new dict()

var app = require('express')();
var http = require('http').Server(app);

var server = net.createServer(function(client) { //'connection' listener

  connections.set(client.remoteAddress.toString(), client)
  // connections.push(client)

  var jsonString = JSON.stringify({"code":2, "result":true})
  client.write(jsonString);

  // var clientSave = client
  console.log('client connected ========');
  console.log(".remoteAddress : "+client.remoteAddress);
  console.log(".remotePort : "+client.remotePort);

  client.on('connect', function() {

  });

  client.on('end', function(data) {

    console.log('client disconnected ========');
    // console.log("data: "+data);
    // console.log(".remoteAddress : "+client.remoteAddress);
    // console.log(".remotePort : "+client.remotePort);
    // client.destory()
  });


  client.on('close', function(data) {

    console.log('client close ========');
    // console.log("data: "+data);
    // console.log(".remoteAddress : "+client.remoteAddress);
    // console.log(".remotePort : "+client.remotePort);
    // client.destory()
  });


  client.on('data', function (data) {
    // body...
    // console.log("DATA : "+data);
    // var jsonString = JSON.stringify({"code":0, "type":"SendResult", "result":true})
    // client.write(jsonString);
    console.log(data);
    console.log('client Send Data ========');
    console.log(".remoteAddress : "+client.remoteAddress);
    console.log(".remotePort : "+client.remotePort);

    // try {
    //   var data = JSON.parse(data)
    //   // console.log("NAME: "+jsonObject.name);
    //   // console.log("AGE: "+jsonObject.age);
    //
    //   connections.forEach(function (value, key) {
    //     console.log("Star Wars Episode " + key + ": " + value);
    //     if (client.remoteAddress.toString() != key) {
    //       var jsonObject = {"code":1, "type":"ReceiveMessage","context":data.context, "lang":data.lang, "name":data.name}
    //       value.write(JSON.stringify(jsonObject))
    //     }
    //   });
    //
    //   } catch (e) {
    //     console.log(e);
    // }
  })
});

app.get('/', function(req, res){
  res.sendFile(process.cwd()+'/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

server.listen(8888, function() { //'listening' listener
  console.log('Server Is Start!');
});
