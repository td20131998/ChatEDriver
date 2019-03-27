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
    Username: 'adog',
    Password: 'aaaaaaa',
    Avatar: 'Milu',
    Status: 'Go go go'
};
// ModelUser.validate(newUser, () => {
//     ModelUser.isUserExisted(newUser, () => {
//         ModelUser.createUser(newUser, () => {
//             console.log("Create success");
//         });
//     })
// })
console.log(ModelUser.isUserExisted({ Username: 'duongdeptrai'}));
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
    User_ID: 'alitleButerfly'
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
// ModelMessage.deleteMessage(6666);


//////////////////////////////////
//Test ModelUserRoom
//////////////////////////////////
let newUserRoom = {
    User_Room_ID: 'a541eb05-4c83-4b99-b9c2-cfa279681752',
    User_ID: 'sdfdg',
    Room_ID: '234fssdf',
    Status: "First user room"
};
// ModelUserRoom.createUserRoom(newUserRoom);
// ModelUserRoom.deleteUserRoom('a541eb05-4c83-4b99-b9c2-cfa279681752');