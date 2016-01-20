var sendbubble_ctr = 0,
	receivebubble_ctr= 0;

function messageDisplayDivCalc(){

	var pagenamedivheight = $('#pagenamediv').height();
	$('#messagedisplaydiv').css('padding-top', pagenamedivheight + 30);	//few pixels for username and typing notification

	var typingmessagedivheight = $('#typingmessagediv').height();
	$('#messagedisplaydiv').css('padding-bottom', 10);

	var restofpageheight = $(window).height() - typingmessagedivheight - 10; //added above, deleted here
	//alert(restofpageheight);
	$('#messagedisplaydiv').css('height', restofpageheight);

}

$(document).ready(function () {
	$('#pagenamediv').append('<h4><i class="fa fa-chevron-circle-right"></i><i> '+ usernameAvailable +'</i></h4>');
	messageDisplayDivCalc();
	$(window).resize(function () {
		messageDisplayDivCalc();		
	});

	$('#messagetobesent').on('keypress', function () {
		socket.emit('typing', usernameAvailable);
	});

	$('#messagetobesent').on('keyup', function () {
		socket.emit('stoppedtyping', usernameAvailable);
	});


});

$('#messagetobesent').on('keyup', function(e) {
	if (e.which == 13 && ! e.shiftKey) {
		sendmessage();
    }
});

function sendmessage() {
	var message = $('#messagetobesent').val();
	if($('#messagetobesent').length == 1 && $('#messagetobesent').val() == '\n')
	{	
		alert("Empty message..");
		$('#messagetobesent').val("");
	}
	else
	{
		sendbubble_ctr++;
		var sendmsg = '<div class="col-xs-5 col-xs-offset-7 col-sm-5 col-sm-offset-7 col-md-5 col-md-offset-7 sendbubble" id = sendbubble_'+ sendbubble_ctr + '>' + message + '</div><div class="clearfix"></div>';
		socket.emit('sndmsg', message);
		$('#messagedisplaydiv').append(sendmsg);
		$('#messagetobesent').val("");
		$('#messagedisplaydiv').animate({ scrollTop: $('#messagedisplaydiv')[0].scrollHeight}, 200);
	}
}

socket.on('msgreceive', function (message, sender) {
	console.log("Message recieved :: " +message+ "from "+ sender);
	if(sender != usernameAvailable)
	{
		var receivemsg = '<div class="col-xs-5 col-xs-offset-0 col-sm-5 col-sm-offset-0 col-md-5 col-md-offset-0 receivebubble"><span><b>'+ sender + '</b></span><br>'+ message + '</div><div class="clearfix"></div>';
		$('#messagedisplaydiv').append(receivemsg);
		$('#messagedisplaydiv').animate({ scrollTop: $('#messagedisplaydiv')[0].scrollHeight}, 200);
	}
});

socket.on('usertyping', function (username) {
	$('#pagenamediv').append('<span><h5 class="' + username + '_typinginfo typinginfocolor">'+ username +' is typing..</h5></span>');
});

socket.on('userstoppedtyping', function (username) {
	$('.'+username+'_typinginfo').remove();
});