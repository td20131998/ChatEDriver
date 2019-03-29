const sql = require('mssql');

module.exports = {
    validate: function() {

    },
    checkRoomExist: function(room, callback) {
        new sql.Request().query(`SELECT * FROM [dbo].[Room] WHERE Room_ID = '${room.Room_ID}'`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (result.recordset.length !== 0) {
                    console.log('Room_ID existed');
                } else {
                    callback(room);
                }
            }
        })
    },
    createRoom: function(newRoom, callback) {
        new sql.Request().query(
            `INSERT INTO [dbo].[Room] VALUES (
                '${newRoom.Room_ID}',
                '${newRoom.Room_Name}',
                '${newRoom.Created}',
                '${newRoom.Status}'
            )`, err => {
            if (err) {
                console.log(err);
                sql.close();
            } else {
                callback()
            }
        });
    },
    deleteRoom: function(Room_ID, callback) {
        new sql.Request().query(`DELETE FROM [dbo].[Room] WHERE Room_ID = '${Room_ID}'`, err => {
            if (err) {
                console.log(err);
                sql.close();
            } else {
                callback(); 
            } 
        });
    }
}