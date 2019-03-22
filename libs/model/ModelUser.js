var sql = require('mssql');
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
    createUser: function(newUser) {
        sql.connect(sqlConfig, err => {
            new sql.Request().query(`insert into User values (
                'qqqqqqqq',
                'duongdeptrai',
                '123456',
                'Nguyen Tung Duong',
                'HIHIHIHI'
            )`, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            })
        })
    }
}