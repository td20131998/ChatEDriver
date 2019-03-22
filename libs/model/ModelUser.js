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
    isUserExisted: function() {

    },
    createUser: function(newUser) {
        sql.connect(sqlConfig, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Connection success');
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
                        console.log('Create Success');
                        sql.close();
                    }
                });
            };
        });
    },
    deleteUser: function(User_ID) {
        sql.connect(sqlConfig, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Connection success');
                new sql.Request().query(`DELETE FROM [dbo].[User] WHERE User_ID = '${User_ID}'`, err => {
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