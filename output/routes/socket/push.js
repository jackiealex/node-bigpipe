module.exports = function() {
  var io;
  io = this;
  return io.on('connection', function(socket) {
    console.log('a user socket connected!!!');
    socket.on('disconnect', function(e) {
      return console.log('user disconnected');
    });
    socket.on('request_broadcast', function(data) {
      console.log('user request_broadcast ', data);
      return io.emit('push', data);
    });
    return socket.on('request_feedback', function(data) {
      console.log('user request_broadcast ', data);
      return io.emit('push', data);
    });
  });
};
