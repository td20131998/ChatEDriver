const sql = require('mssql');

module.exports = {
    checkUserAdminExist: function(admin, callback) {
        new sql.Request().query(`SELECT * FROM [dbo].[User] WHERE User_ID = '${admin.User_ID}'`, (err, result) => {
            if (err) {
                console.log(err);
                sql.close();
            } else {
                if (result.recordset.length === 0) {
                    console.log('User does not exist');
                } else {
                    new sql.Request().query(`SELECT * FROM [dbo].[User_Admin] WHERE Admin_ID = '${admin.Admin_ID}'`, (err, result) => {
                        if (err) {
                            console.log(err);
                            sql.close();
                        } else {
                            if (result.recordset.length !== 0) {
                                console.log('Admin_ID existed');
                            } else {
                                callback(admin);
                            }
                        }
                    })
                };
            }
        })
    },
    createAdmin: function(newAdmin, callback) {
        new sql.Request().query(
            `INSERT INTO [dbo].[User_Admin] VALUES (
                '${newAdmin.Admin_ID}',
                '${newAdmin.User_ID}'
            )`, err => {
            if (err) {
                console.log(err);
                sql.close();
            } else {
                callback();
            }
        });
    },
    deleteAdmin: function(Admin_ID, callback) {
        new sql.Request().query(`DELETE FROM [dbo].[User_Admin] WHERE Admin_ID = '${Admin_ID}'`, err => {
            if (err) {
                console.log(err);
                sql.close();
            } else {
                callback();
                // sql.close();
            } 
        });
    }
}