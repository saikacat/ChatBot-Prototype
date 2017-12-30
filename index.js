var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sockets={};
var roomnames=[];

app.get('/', function(req, res){
 res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


io.on('connection', function(socket){

  console.log('a user connected');
  console.log(socket.id);
  sockets[socket.id]=socket;
  socket.join('default');
  roomnames.push('default');
   socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected, id is '+socket.id);
      delete sockets[socket.id];
     
  });
  socket.on('namechange',function(data){
  	
    delete sockets[socket.id];
    socket.id=data.key;
   sockets[socket.id]=socket;
 
});  
socket.on('currentlyConnected',function(){
	console.log('entered currentlyConnected');
	socket.emit('sockets123',{sockets123:Object.keys(sockets)});
});
socket.on('chatroom',function(data){
	console.log(data.chatr00m);
	roomnames.push(data.chatr00m);
	socket.join(data.chatr00m);
});
});
    
 
//io.on('connection', function(socket){
 
//});
