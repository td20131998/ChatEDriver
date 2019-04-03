const sql = require('./mssql');

module.exports = {
    validate: function() {

    },
    checkRoomExist: function(room, callback) {
        sql.connect(function() {
            sql.query(`SELECT * FROM [dbo].[Room] WHERE Room_ID = '${room.Room_ID}'`, result => {
                if (result.recordset.length !== 0) {
                    // console.log('Room_ID existed');
                    sql.close(() => callback(true));
                } else {
                    sql.close(() => callback(false));
                }
            })
        })
    },
    createRoom: function(newRoom, callback) {
        sql.connect(function() {
            sql.query(`INSERT INTO [dbo].[Room] VALUES (
                '${newRoom.Room_ID}',
                '${newRoom.Room_Name}',
                '${newRoom.Created}',
                '${newRoom.Status}'
            )`, result => sql.close(() => callback()));
        })
    },
    deleteRoom: function(Room_ID, callback) {
        sql.connect(function() {
            sql.query(`DELETE FROM [dbo].[Room] WHERE Room_ID = '${Room_ID}'`, result => sql.close(() => callback()));
        })
    }
}