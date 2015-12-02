module.exports = ()->
	io = @
	io.on 'connection', (socket) ->
		console.log('a user socket connected!!!')

		socket.on 'disconnect', (e)->
		    console.log('user disconnected');

		socket.on 'request_broadcast', (data)->
			console.log('user request_broadcast ', data);
			io.emit('push', data);

		socket.on 'request_feedback', (data)->
			console.log('user request_broadcast ', data);
			io.emit('push', data);

