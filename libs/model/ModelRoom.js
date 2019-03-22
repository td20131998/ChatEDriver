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
    isRoomExisted: function() {
        
    },
    createRoom: function(newRoom) {
        sql.connect(sqlConfig, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Connection success');
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
                        console.log('Create Success');
                        sql.close();
                    }
                });
            };
        });
    },
    deleteRoom: function(Room_ID) {
        sql.connect(sqlConfig, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Connection success');
                new sql.Request().query(`DELETE FROM [dbo].[Room] WHERE Room_ID = '${Room_ID}'`, err => {
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