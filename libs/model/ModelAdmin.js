const sql = require('./mssql');

module.exports = {
    checkUserAdminExist: function(admin, callback) {
        sql.connect(function() {
            sql.query(`SELECT * FROM [dbo].[User] WHERE User_ID = '${admin.User_ID}'`, result => {
                if (result.recordset.length === 0) {
                    // console.log('User does not exist');
                    sql.close(() => callback(false));
                } else {
                    sql.query(`SELECT * FROM [dbo].[User_Admin] WHERE Admin_ID = '${admin.Admin_ID}'`, result => {
                        if (result.recordset.length !== 0) {
                            console.log('Admin_ID existed');
                            sql.close(() => callback(true));
                        } else {
                            sql.close(() => callback(false));
                        }
                    })
                };
            })
        })
    },
    createAdmin: function(newAdmin, callback) {
        sql.connect(function() {
            sql.query(`INSERT INTO [dbo].[User_Admin] VALUES (
                '${newAdmin.Admin_ID}',
                '${newAdmin.User_ID}'
            )`, result => sql.close(() => callback()));
        })
    },
    deleteAdmin: function(Admin_ID, callback) {
        sql.connect(function() {
            sql.query(`DELETE FROM [dbo].[User_Admin] WHERE Admin_ID = '${Admin_ID}'`, result => {
                sql.close(() => callback());
            })
        })
    }
}