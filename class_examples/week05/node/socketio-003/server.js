//In terminal - run: 

//npm install  - to download the necessary modules.
//node server.js - to run the server file in node.

var express = require('express'); //connect to the express module(external located in node_modules folder after npm install)
var http = require('http'); //connect to the http module (native to node)
var socketio = require('socket.io'); //connect to the socket.io module, this allows us to use websockets - so we can stream real time data to the server and clients.

var app = express(); //instantiate object of express as app

var server = http.createServer(app); //create our webserver using http, but pass it our express application this allows express to handle traffic and websockets to work through http
var io = socketio.listen(server); //create our io object which has access to the server & express.
var port = 8080; //set our port


app.use(express.static(__dirname+'/public')); //allow us to serve up the public folder for html files

server.listen(port);//start listening for traffic on our port

console.log("Listening on Port "+port+", press control-C to quit");


//socket event listener.
//this function sits and listens websocket traffic
//when it gets traffics it calls a function which it passes the socket
//for every socket event this gets called.
io.sockets.on('connection', function(socket){
	
	socket.emit('news', {hello: 'world'}); //we send off a hello event for our connection.

	//if we recieve a message from the socket on the channel 'mouse event'
	socket.on('mouse event', function(data){
		
		//broadcast out to all the other connects which have been made that there is box data. 
		//This box data is the same as our mouse data coming in.	
		socket.broadcast.emit('box',data);
		console.log(data); //log out the data coming in so we can see it working
		
	});
	
});