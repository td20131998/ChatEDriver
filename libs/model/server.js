const sql = require('mssql');

const config = {
    user: 'duongnt',
    password: '123456',
    server: 'ADMIN',
    database: 'ChatEDriver',
    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
};

function getList() {
    // var conn = new sql.ConnectionPool(config);
    // conn.connect(err => {
    //     if (err) { 
    //         console.log(err);
    //     } else {
    //         console.log("Connection successful");
    //     }
    //     var req = new sql.Request();
    //     req.query('select * from user', (err, recordset) => {
    //         if (err) console.log(err)
    //         else {
    //             console.dir("success");
    //         };
    //         conn.close();
    //     })
    // })
    sql.connect(config, err => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connection successful');
        };
        new sql.Request().query('select * from [dbo].[User]', (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result.recordsets[0][0]);
                
                
            }
        })
    })
};
getList();