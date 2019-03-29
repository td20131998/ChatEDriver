const sql = require('mssql');

module.exports = {
    checkUserRoomExist: function(userRoom, callback) {
        new sql.Request().query(`SELECT * FROM [dbo].[User_Room] WHERE User_Room_ID = '${userRoom.User_Room_ID}'`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (result.recordset.length !== 0) {
                    console.log('User_Room existed');
                } else {
                    callback(userRoom);
                }
            }
        })
    },
    createUserRoom: function(newUserRoom, callback) {
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
                callback()
            }
        });
    },
    deleteUserRoom: function(User_Room_ID, callback) {
        new sql.Request().query(`DELETE FROM [dbo].[User_Room] WHERE User_Room_ID = '${User_Room_ID}'`, err => {
            if (err) {
                console.log(err);
                sql.close();
            } else {
                callback()
                // sql.close();
            } 
        });
    }
}