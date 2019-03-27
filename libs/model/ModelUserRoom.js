const sql = require('mssql');
const sqlConfig = {
    user: 'duongnt',
    password: '123456',
    server: "ADMIN",
    database: 'ChatEDriver',
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
};

module.exports = {
    isUserRoomExisted: function() {

    },
    createUserRoom: function(newUserRoom) {
        sql.connect(sqlConfig, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Connection success');
                new sql.Request().query(
                    `INSERT INTO [dbo].[User_Room] VALUES (
                        '${newUserRoom.User_Room_ID}',
                        '${newUserRoom.User_ID}',
                        '${newUserRoom.Room_ID}',
                        '${newUserRoom.Status}'
                    )`, err => {
                    if (err) {
                        console.log(err);
                        sql.close();
                    } else {
                        console.log('Create Success');
                        sql.close();
                    }
                });
            };
        });
    },
    deleteUserRoom: function(User_Room_ID) {
        sql.connect(sqlConfig, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Connection success');
                new sql.Request().query(`DELETE FROM [dbo].[User_Room] WHERE User_Room_ID = '${User_Room_ID}'`, err => {
                    if (err) {
                        console.log(err);
                        sql.close();
                    } else {
                        console.log('Delete Success');
                        sql.close();
                    } 
                });
            };
        });
    }
}