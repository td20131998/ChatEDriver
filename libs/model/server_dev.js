const ModelUser = require('./ModelUser');
const ModelRoom = require('./ModelRoom');
const ModelAdmin = require('./ModelAdmin');
const ModelMessage = require('./ModelMessage');
const ModelUserRoom = require('./ModelUserRoom');

//////////////////////////////////
//Test ModelUser
//////////////////////////////////
let newUser = {
    User_ID: '99999',
    Username: 'a_dog',
    Password: 'aaaaaaa',
    Avatar: 'Milu',
    Status: 'Go go go'
};
// ModelUser.createUser(newUser);
// ModelUser.deleteUser(999);


//////////////////////////////////
//Test ModelRoom
//////////////////////////////////
let newRoom = {
    Room_ID: '8888',
    Room_Name: 'EUP',
    Created: '',
    Status: 'First room'
};
// ModelRoom.createRoom(newRoom);
// ModelRoom.deleteRoom(0000);

//////////////////////////////////
//Test ModelAdmin
//////////////////////////////////
let newAdmin = {
    Admin_ID: 'abigbird',
    User_ID: 'alittlebuterfly'
};
// ModelAdmin.createAdmin(newAdmin);
// ModelAdmin.deleteAdmin('abigbird');

//////////////////////////////////
//Test ModelMessage
//////////////////////////////////
let newMessage = {
    Message_ID: '6666',
    Sender_ID: '1234',
    Room_ID: '345345',
    Message: 'Hello my name is Duong',
    Type: 'text',
    Created: '',
    Status: 'seen'
};
// ModelMessage.createMessage(newMessage);
ModelMessage.deleteMessage(6666);