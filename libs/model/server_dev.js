const ModelUser = require('./ModelUser');
const ModelRoom = require('./ModelRoom');
const ModelAdmin = require('./ModelAdmin');
const ModelMessage = require('./ModelMessage');
const ModelUserRoom = require('./ModelUserRoom');

ModelUser.checkUserExist({ Username: 'ha1' }, (isUserExisted) => {
    if (isUserExisted) {
        console.log('Username existed');
    } else {
        console.log('Username valid');
    }
})
// ModelUser.login({ Username: 'ha1' }, function(user) {
//     if(user !== false){
//         // let token = crypto.randomBytes(64).toString('hex');
//         // tokens[token] = new Date().getTime();
//         // res.json({
//         //     status:1,
//         //     data:{
//         //         user: user,
//         //         token: token
//         //     }
//         // });
//         console.log('Logined')
//     }else{
//         // res.json({
//         //     status:2,
//         //     message: 'User not exist'
//         // });
//         console.log('Login failed');
//     }
// })

// sql.connect(config, err => {
//     if (err) {
//         console.log(err);
//     };
    
//     //////////////////////////////////
//     //Test ModelUser
//     //////////////////////////////////
//     let user = {
//         User_ID: '1',
//         Username: 'test',
//         Password: 'aaaaaaa',
//         Avatar: 'Milu',
//         Status: 'Go go go'
//     };

//     // ModelUser.validate(user, (result) => {
//     //     ModelUser.checkUserExist(result, (user) => {
//     //         ModelUser.createUser(user, () => { console.log('Created user success') });
//     //     })
//     // });
    
//     ModelUser.deleteUser(user.User_ID, () => { console.log(`Deleted user success`) });
    
//     // ModelUser.deleteUser(999);


//     //////////////////////////////////
//     //Test ModelRoom
//     //////////////////////////////////
//     let newRoom = {
//         Room_ID: '0101',
//         Room_Name: 'EUP',
//         Created: '',
//         Status: 'First room'
//     };
//     // ModelRoom.checkRoomExist(newRoom, (room) => {
//     //     ModelRoom.createRoom(room, () => console.log('Created room success'));
//     // })


//     //////////////////////////////////
//     //Test ModelAdmin
//     //////////////////////////////////
//     let newAdmin = {
//         Admin_ID: '3',
//         User_ID: '1'
//     };
//     // ModelAdmin.checkUserAdminExist(newAdmin, (admin) => {
//     //     ModelAdmin.createAdmin(admin, () => { console.log('Created admin success') });
//     // });
//     // ModelAdmin.deleteAdmin(newAdmin.Admin_ID, () => { console.log('Delete admin success') });
   


//     //////////////////////////////////
//     //Test ModelMessage
//     //////////////////////////////////
//     let newMessage = {
//         Message_ID: '6666',
//         Sender_ID: '1234',
//         Room_ID: '345345',
//         Message: 'Hello my name is Duong',
//         Type: 'text',
//         Created: '',
//         Status: 'seen'
//     };
//     // ModelMessage.createMessage(newMessage);
//     // ModelMessage.deleteMessage(6666);


//     //////////////////////////////////
//     //Test ModelUserRoom
//     //////////////////////////////////
//     let newUserRoom = {
//         User_Room_ID: 'a541eb05-4c83-4b99-b9c2-cfa279681258',
//         User_ID: '1',
//         Room_ID: '234fssdf',
//         Status: "First user room dsfs"
//     };
//     // ModelUserRoom.checkUserRoomExist(newUserRoom, (userRoom) => {
//     //     ModelUserRoom.createUserRoom(userRoom, () => console.log('Created User_Room success'));
//     // });
//     // ModelUserRoom.deleteUserRoom('a541eb05-4c83-4b99-b9c2-cfa279681752');
// });
