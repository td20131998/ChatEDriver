module.exports = (function () {
    var chatroomManager = null;
    // mapping of all available chatrooms
    const Users = new Map();
    const UsersRoom = new Map();
    //users[userNickname][socket.id] = socket;

    var addClient = function(userID,client) {
        if(!Users.has(userID)) Users.set(userID,[]);

        let data = Users.get(userID);
        data[client.id] = client;


        //join to exist room
        if(UsersRoom.has(userID)){
            let rooms = UsersRoom.get(userID);
            for(let key in rooms){
                client.join(key);
            }
        }
    }

    var joinRoom = function (userID,receiverID) {
        let roomName = chatroomManager.renderRoomName(userID,receiverID);
        if(Users.get(userID)){
            let Clients = Users.get(userID);
            for(var client_id in Clients){
                let client = Clients[client_id];
                client.join(roomName);
                if(!UsersRoom.has(client.userID)) UsersRoom.set(client.userID,{});
                var rooms = UsersRoom.get(client.userID);
                rooms[roomName]=roomName;
                let Chatroom = chatroomManager.switchToChatRoomByName(roomName);
                if(Chatroom){
                    let message = {message:'Join room', sender:userID,receive:receiverID,room_name:roomName,histories: Chatroom.getChatHistory()};
                    client.emit('message',message)
                }

            }
        }
        if(Users.get(receiverID)){
            let Clients = Users.get(receiverID);
            for(var client_id in Clients){
                let client = Clients[client_id];
                client.join(roomName);
                if(!UsersRoom.has(client.userID)) UsersRoom.set(client.userID,{});
                var rooms = UsersRoom.get(client.userID);
                rooms[roomName]=roomName;
            }
        }
    }

    return {
        addClient:addClient,
        joinRoom:joinRoom,
        setChatroomManager:function (m) {
            chatroomManager = m;
        },
    }
})();