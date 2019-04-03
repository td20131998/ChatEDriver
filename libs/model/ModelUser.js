const sql = require('./mssql');
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
        sql.connect(function() {
            sql.query(`SELECT * FROM [dbo].[User] WHERE Username = '${newUser.Username}'`, result => {
                if (result.recordset.length === 1) {
                    let user = result.recordset[0];
                    //Get all client[User_Admin]]
                    var User_ID = user.User_ID;
                    let condition = ` WHERE [dbo].[User].User_ID IN (
                        SELECT [dbo].[User_Admin].User_ID FROM [dbo].[User_Admin] WHERE [dbo].[User_Admin].Admin_ID ='${User_ID}'
                    )`;
                    if(user.type == 1){
                        condition = ` WHERE [dbo].[User].User_ID IN (
                            SELECT [dbo].[User_Admin].Admin_ID FROM [dbo].[User_Admin] WHERE [dbo].[User_Admin].User_ID ='${User_ID}'
                        )`;
                    }
                    let sqlQuery = `SELECT 
                        [dbo].[User].User_ID,
                        [dbo].[User].Username,
                        [dbo].[User].Avatar,
                        [dbo].[User].Status,name,
                        [dbo].[User].type                     
                        FROM [dbo].[User] ${condition}`;
                    console.log(sqlQuery);
                    sql.query(sqlQuery, (result1) => {
                        user.clients = result1.recordset;
                        sql.close(() => callback(user));
                    })
                } else {
                    sql.close(() => callback(false));
                };
            })
        })
    },
    checkUserExist: function(newUser, callback) {
        sql.connect(function() {
            sql.query(`SELECT * FROM [dbo].[User] WHERE Username = '${newUser.Username}'`, result => {
                if (result.recordset.length !== 0) {
                    // console.log('Username existed');
                    
                } else {
                    // console.log('Username valid');
                    sql.close(() => callback(false));
                };
            });
        });
    },
    createUser: function(newUser, callback) {
        sql.connect(function() {
            sql.query(`INSERT INTO [dbo].[User] VALUES (
                '${newUser.User_ID}',
                '${newUser.Username}',
                '${newUser.Password}',
                '${newUser.Avatar}',
                '${newUser.Status}'
            )`, result => sql.close(() => callback(newUser)));
        });
    },
    deleteUser: function(User_ID, callback) {
        sql.connect(function() {
            sql.query(`DELETE FROM [dbo].[User] WHERE User_ID = '${User_ID}'`, result => {
                //Delete User_Room user joined
                sql.query(`SELECT * FROM [dbo].[User_Room] WHERE User_ID = '${User_ID}'`, result => {
                    let userRooms = result.recordset;
                    for(let userRoom of userRooms) {
                        ModelUserRoom.deleteUserRoom(userRoom.User_Room_ID, () => console.log(`Delete User_Room ${userRoom.User_Room_ID} success`));
                    };
                })

                //Delete User_Admin is user
                sql.query(`SELECT * FROM [dbo].[User_Admin] WHERE User_ID = '${User_ID}'`, result => {
                    let admins = result.recordset;
                    for(let admin of admins) {
                        ModelAdmin.deleteAdmin(admin.Admin_ID, () => console.log(`Delete admin ${admin.Admin_ID} success`));
                    }
                })
                sql.close(() => callback());
            })
        });
    },
}