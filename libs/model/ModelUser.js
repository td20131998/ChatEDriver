const sql = require('mssql');
const ModelUserRoom = require('./ModelUserRoom');
const ModelAdmin = require('./ModelAdmin');

module.exports = {
    validate: function(newUser, callback) {
        let result = newUser;
        result.Username = result.Username.trim()
        if (result.Username !== '') {
            //username only incluses alphabet and numbers
            if (/^[a-zA-Z0-9]+$/.test(result.Username)) {
                callback(result);
            } else {
                console.log('Invalid username');
            }
        } else {
            console.log("Invalid username");
        };
    },

    login: function(newUser, callback) {
        console.log(newUser.Username);
        new sql.Request().query(`SELECT * FROM [dbo].[User] WHERE Username = '${newUser.Username}'`, (err, result) => {
            console.log(result);
            if (err) {
                console.log('SQL1 error: ' + err);
                callback(false);
            } else {
                if (result.recordset.length === 1) {
                    callback(result.recordset[0]);
                } else {
                    callback(false)
                };
            }


            sql.close();
        })
    },
    checkUserExist: function(newUser, callback) {
        new sql.Request().query(`SELECT * FROM [dbo].[User] WHERE Username = '${newUser.Username}'`, (err, result) => {
            if (err) {
                console.log('SQL error: ' + err);
                sql.close();
            } else {
                if (result.recordset.length !== 0) {
                    console.log('Username existed');
                    // return true;
                } else {
                    console.log('Good username');
                    callback(newUser)
                    // return false;
                };
            }
        })
    },
    createUser: function(newUser, callback) {
        new sql.Request().query(
            `INSERT INTO [dbo].[User] VALUES (
                '${newUser.User_ID}',
                '${newUser.Username}',
                '${newUser.Password}',
                '${newUser.Avatar}',
                '${newUser.Status}'
            )`, err => {
            if (err) {
                console.log(err);
                sql.close();
            } else {
                callback(newUser);
            }
        });
    },
    deleteUser: function(User_ID, callback) {
        new sql.Request().query(`DELETE FROM [dbo].[User] WHERE User_ID = '${User_ID}'`, err => {
            if (err) {
                console.log(err);
                sql.close();
            } else {
                //Delete User_Room user joined
                new sql.Request().query(`SELECT * FROM [dbo].[User_Room] WHERE User_ID = '${User_ID}'`, (err, result) => {
                    let userRooms = result.recordset;
                    for(let userRoom of userRooms) {
                        ModelUserRoom.deleteUserRoom(userRoom.User_Room_ID, () => console.log(`Delete User_Room ${userRoom.User_Room_ID} success`));
                    };
                });

                //Delete User_Admin is user
                new sql.Request().query(`SELECT * FROM [dbo].[User_Admin] WHERE User_ID = '${User_ID}'`, (err, result) => {
                    let admins = result.recordset;
                    for(let admin of admins) {
                        ModelAdmin.deleteAdmin(admin.Admin_ID, () => console.log(`Delete admin ${admin.Admin_ID} success`));
                    }
                });
                callback();
            } 
        });
    },
}