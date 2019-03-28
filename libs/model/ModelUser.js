const sql = require('mssql');
const sqlConfig = {
    user: 'duongnt',
    password: '123456',
    server: "ADMIN",
    database: 'ChatEDriver',
    options: {
        encrypt: false // Use this if you're on Windows Azure
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};
const connPool = new sql.ConnectionPool(sqlConfig).connect();

module.exports = {
    validate: function(newUser, callback) {
        // console.log(newUser.Username);
        let result = newUser.Username.trim();
        if (result !== '') {
            if (/^[a-zA-Z0-9]+$/.test(newUser.Username)) {
                callback(result);
            } else {
                console.log('Username just includes alphabet and numbers');
                return;
            }
        } else {
            console.log("Username cannot be empty");
            return;
        };
    },
    isUserExisted: async function(newUser) {
        await connPool;
        try {
            const request = new sql.Request(connPool);
            const result = await request.query(`SELECT * FROM [dbo].[User] WHERE Username = '${newUser.Username}'`);
            if (result.recordset.length !== 0) {
                console.log('Username existed');
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log('SQL error: ' + err);
        };
        // sql.connect(sqlConfig, err => {
        //     if (err) {
        //         console.log('Connection error: ' + err);
        //     } else {
        //         new sql.Request().query(`SELECT * FROM [dbo].[User] WHERE Username = '${newUser.Username}'`, (err, result) => {
        //             if (err) {
        //                 sql.close();
        //                 console.log('SQL error: ' + err);
        //                 return;
        //             } else {
        //                 sql.close();
        //                 if (result.recordset.length !== 0) {
        //                     console.log('Username existed');
        //                     return true;
        //                 } else {
        //                     return false;
        //                 };
        //                 // console.log(result);
        //             }
        //         })
        //     }
        // })
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