var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

var usernames = [],
	username_sockets = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/', express.static(__dirname+'/public/'));

app.get('/chat', function (req, res) {
	res.sendFile(__dirname + '/public/enterchat.html');
});

io.sockets.on('connection', function (socket) {
	console.log("Connected from " + socket.id);
	
	socket.on('disconnect', function () {
		var user = username_sockets[socket.id];
		var index = usernames.indexOf(user);
		usernames.splice(index, 1);
		delete username_sockets[socket.id];
		console.log("Disconnected from " + user);
	});
	
	socket.on('newusr', function (newusrname) {
		console.log("New user name request:: " + newusrname);
		if(usernames.indexOf(newusrname) >= 0)
		{
			console.log("Already used username..");
			console.log(usernames);
			socket.emit('usernameTaken', newusrname);
		}
		else
		{
			socket.emit('usernameavlbl', newusrname);
		}
	});

	socket.on('startchat', function (usernameAvailable) {
		if(usernames.indexOf(usernameAvailable) >= 0)
		{
			console.log("Just taken username..");
			socket.emit('usernameJustTaken', usernameAvailable);	//returning the usernae that just got taken
		}
		else
		{
			usernames.push(usernameAvailable);
			console.log("Opening chat window for "+usernameAvailable);
			username_sockets[socket.id] = usernameAvailable;
			socket.emit('openchatwindow',usernameAvailable);
		}
	});

	socket.on('sndmsg', function (message) {
		console.log("Message from " + username_sockets[socket.id] + " :::: " + message);
		/*console.log(socket.handshake);*/
		socket.broadcast.emit('msgreceive', message, username_sockets[socket.id]);
	});

	socket.on('typing', function (username) {
		socket.broadcast.emit('usertyping', username);
	});

	socket.on('stoppedtyping', function (username) {
		socket.broadcast.emit('userstoppedtyping', username);
	});	
});

server.listen(8080,'0.0.0.0');
console.log("Listening on 8080..");