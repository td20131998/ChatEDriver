const express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

const fileUpload = require('express-fileupload');
// default options
app.use(fileUpload());

var  language = require('./config/language');
var config = require('./configuration');
var chatroomManager = require('./libs/ChatroomManager');
var usersManager = require('./libs/UserManager');
usersManager.setChatroomManager(chatroomManager);
var tokens = {};
const sql = require('mssql');

require('./routes/routes.js')(app,config,tokens,__dirname);


/*
setTimeout(function () {
    const request = new sql.Request()
    request.query('insert into users (user_id) values (553)', (err, result) => {
        console.log(result)
    });
},3000)*/

// usernames which are currently connected to the chat
const usernames = {};

// rooms which are currently available in chat
const rooms = {};

io.use(function(socket, next){
    //console.log(socket.handshake.query);
    if (socket.handshake.query && socket.handshake.query.token){
        if(tokens.hasOwnProperty(socket.handshake.query.token)){
            next();
        }else{
            next(new Error('Authentication error'));
        }
    } else {
        next(new Error('Authentication error'));
    }
}).on('connection', (socket) => {

    socket.on('join', function(userNickname) {

        usernames[userNickname] = userNickname;

        socket.userID = userNickname;
        usersManager.addClient(userNickname,socket);

        //join client to room exist
/*
        let cloned = { ... usernames };
        delete cloned[userNickname];
        socket.emit('listuser',{users : cloned});*/

        /*

        if(typeof userRooms[userNickname] !== 'undefined' && typeof userRooms[userNickname]['rooms'] !== 'undefined'){
            for(var room_name in userRooms[userNickname]['rooms']){
                socket.join(room_name);
                socket.broadcast.to(room_name).emit('userOnline',userNickname);
            }
        }*/
    });

    socket.on('messagedetection', (senderNickname,receiverNickName,roomName,messageContent) => {
        let message = {message:messageContent, sender:senderNickname,receive:receiverNickName,room_name:roomName};

        //Chatroom manager to switch room and send message
        chatroomManager.switchToChatRoom(senderNickname,receiverNickName).broadcastMessage(message,io);
    });

    socket.on('disconnect', function() {
        /*socket.broadcast.emit("userdisconnect",{"message":"has left the chat", "senderNickname":socket.username});
        delete users[socket.username][socket.id];
        delete users[socket.username];*/
    });

    socket.on('createroom',function (data) {

        chatroomManager.createChatRoom(data.sender,data.receive);
        usersManager.joinRoom(data.sender,data.receive);

    })
});


server.listen(3000,()=>{
    console.log('Node app is running on port 3000');
});
