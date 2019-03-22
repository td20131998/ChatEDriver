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
    createAdmin: function(newAdmin) {
        sql.connect(sqlConfig, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Connection success');
                new sql.Request().query(
                    `INSERT INTO [dbo].[User_Admin] VALUES (
                        '${newAdmin.Admin_ID}',
                        '${newAdmin.User_ID}'
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
    deleteAdmin: function(Admin_ID) {
        sql.connect(sqlConfig, err => {
            if (err) {
                console.log(err);
            } else {
                console.log('Connection success');
                new sql.Request().query(`DELETE FROM [dbo].[User_Admin] WHERE Admin_ID = '${Admin_ID}'`, err => {
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