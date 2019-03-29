const sql = require('mssql');

module.exports = {
    createMessage: function(newMessage, callback) {
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
                callback()
                // sql.close();
            }
        });
    },
    deleteMessage: function(Message_ID, callback) {
        new sql.Request().query(`DELETE FROM [dbo].[Message] WHERE Message_ID = '${Message_ID}'`, err => {
            if (err) {
                console.log(err);
                sql.close();
            } else {
                callback();
            } 
        });
    }
}