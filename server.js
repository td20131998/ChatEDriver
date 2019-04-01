const express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    fs = require('fs'),
    ejs = require('ejs');
var bodyParser     =         require("body-parser");
var  language = require('./config/language');
var config = require('./configuration');
var chatroomManager = require('./libs/ChatroomManager');
var usersManager = require('./libs/UserManager');
usersManager.setChatroomManager(chatroomManager);


const sql = require('mssql');
const sqlConfig = {
    user: 'duongnt',
    password: '123456',
    server: "127.0.0.1",
    database: 'ChatEDriver',
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}

var modelUser = require('./libs/model/ModelUser')

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//enable public file
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.send('Chat Server is running on port 3000')
});

app.get('/js/administrator.js', (req, res) => {
    var file = "";
    file = __dirname + '/views' + req.url;

    fs.readFile(file,'utf-8', function(err, data) {
        if (err) {
            res.writeHead(404);
            return res.end('Page or file not found');
        }
        var f = ejs.compile(data);
        var fileContent = f({hostname: config.hostname});
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Content-Length', fileContent.length);
        res.send(fileContent);
    });
});

app.get('/index.html', (req, res) => {
    let lng= req.query.lng;
    console.log(language.getDefaultLang(req));
    res.render('pages/index',{language:language});
});

app.post('/login', (req, res) => {
    var username=req.body.username;
    var password=req.body.password;
    sql.connect(sqlConfig, err => {
        modelUser.login({Username:username},function (user) {
            if(user!== false){
                user.Password = 'xxxxxxxxx';
                res.json({
                    status:1,
                    data:{
                        user: user,
                    }
                });
            }else{
                res.json({
                    status:2,
                    message: 'User not exist'
                });
            }

        })
    });


});

/////////////////////////////////////////////////////////////
// Ms sql connect testing
/////////////////////////////////////////////////////////////

sql.connect(sqlConfig, err => {
    // ... error checks
    // Query
    new sql.Request().query('select * from [dbo].[User]', (errroute, result) => {
        // ... error checks
        if(!err){
            //console.log(result);
            for(var i in result.recordset){
                /*console.log(result);
                console.log(result.recordset[i].user_id);*/
            }
        }

        sql.close();
    });
});



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


io.on('connection', (socket) => {

    socket.on('join', function(userNickname) {

        usernames[userNickname] = userNickname;

        socket.userID = userNickname;
        usersManager.addClient(userNickname,socket);

        //join client to room exist

        let cloned = { ... usernames };
        delete cloned[userNickname];
        socket.emit('listuser',{users : cloned});/*

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
