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
    isMessageExisted: function() {

    },
    createMessage: function(newMessage) {
        sql.connect(sqlConfig, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Connection success');
                new sql.Request().query(
                    `INSERT INTO [dbo].[Message] VALUES (
                        '${newMessage.Message_ID}',
                        '${newMessage.Sender_ID}',
                        '${newMessage.Room_ID}',
                        '${newMessage.Message}',
                        '${newMessage.Type}',
                        '${newMessage.Created}',
                        '${newMessage.Status}'
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
    deleteMessage: function(Message_ID) {
        sql.connect(sqlConfig, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Connection success');
                new sql.Request().query(`DELETE FROM [dbo].[Message] WHERE Message_ID = '${Message_ID}'`, err => {
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