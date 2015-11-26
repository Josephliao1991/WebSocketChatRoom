var net = require('net');

var client = net.connect({port: 8888},
    function() { //'connect' listener
  // console.log('connected to server!');
  var jsonString = JSON.stringify({"name":"Shit Man", "lang":"zh", "context":"I Like To Eat Shit!!"})
  client.write(jsonString);
});

client.on('data', function(data) {
  console.log("receive");
  console.log(data.toString());
  // client.end();
});

client.on('end', function() {
  console.log('disconnected from server');
});
