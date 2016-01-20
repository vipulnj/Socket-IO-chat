var socket,
	usernameAvailable;

$(document).ready(function () {
	connect();
	
	var pagenamedivheight = $('#pagenamediv').height();
	$('#checkusernamediv').css('padding-top', pagenamedivheight);

	$('#chataway').attr('disabled', true);

	$('#username').on('blur', function() {
		if(($('#username').val().length) < 3 && ($('#username').val().length) > 0)
			alert("Username too short");
		else if(($('#username').val().length) > 20)
			alert("Username too long");
	});

	$('#checkBtn').on('click', function(event) {
		if($('#username').val() == '')
			alert("Choose a username");
		else
		{
			var newusrname = $('#username').val();
			socket.emit('newusr', newusrname); /*socket.send($('#username').val());*/
		}
	});

	$('#username').on('keydown', function () {
		$('#chataway').attr('disabled', true);
	});

	socket.on('usernameTaken', function (message) {
		alert(message + " is already taken. Try another one..");
	});

	socket.on('usernameJustTaken', function (message) {
		alert(message + " was just taken. Try another one..");
	});

	socket.on('usernameavlbl', function (newusrname) {
		$('#chataway').attr('disabled', false);
		usernameAvailable = newusrname;
	});

	$('#chataway').on('click', function () {
		socket.emit('startchat', usernameAvailable);
	});

	socket.on('openchatwindow', function (usernameAvailable) {
		$('#checkusernamediv').remove();
		$('#chatwindowdiv').load("chatwindow.html");
	});
});

function connect () {
	socket = io.connect(null);
}