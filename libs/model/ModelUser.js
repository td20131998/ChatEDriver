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
    validate: function(newUser, callback) {
        // console.log(newUser.Username);
        let result = newUser.Username.trim();
        if (result !== '') {
            if (/^[a-zA-Z0-9]+$/.test(newUser.Username)) {
                callback();
            } else {
                console.log('Username just includes alphabet and numbers');
                return;
            }
        } else {
            console.log("Invalid username");
            return;
        }
    },
    isUserExisted: function(newUser) {
        // console.log(newUser);
        // console.log(callback);
        sql.connect(sqlConfig, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Connection success');
                new sql.Request().query(
                    `SELECT * FROM [dbo].[User] WHERE Username = ${newUser.Username}`, (err, result) => {
                    if (err) {
                        // console.log(err)
                        console.log('eeeeeeeeeeeeeeee ' + err + ' eeeeeeeeeeeeeeeeee');
                        // console.log('Check user existed: false');
                        sql.close();
                        // return false;
                    } else {
                        // console.log('Check user existed: true');
                        sql.close();
                        // return true;
                    }
                });
            };
        });
    },
    createUser: function(newUser, callback) {
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
                        // console.log('Create Success');
                        sql.close();
                        callback(newUser);
                    }
                });
            };
        });
    },
    deleteUser: function(User_ID, callback) {
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
                        callback()
                    } 
                });
            };
        });
    }
}