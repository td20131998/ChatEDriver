const sql = require('./mssql');

module.exports = {
    createMessage: function(newMessage, callback) {
        sql.connect(function() {
            sql.query(`INSERT INTO [dbo].[Message] VALUES (
                '${newMessage.Message_ID}',
                '${newMessage.Sender_ID}',
                '${newMessage.Room_ID}',
                '${newMessage.Message}',
                '${newMessage.Type}',
                '${newMessage.Created}',
                '${newMessage.Status}'
            )`, resutl => sql.close(() => callback()));
        })
    },
    deleteMessage: function(Message_ID, callback) {
        sql.connect(function() {
            sql.query(`DELETE FROM [dbo].[Message] WHERE Message_ID = '${Message_ID}'`, result => {
                sql.close(() => callback());
            })
        })
    }
}