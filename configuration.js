module.exports = {
    hostname: 'http://localhost:3000/',
    languages: {
        EN : 'English',
        VN : 'Tiếng việt',
    },
    sql : {
        user: 'sa',
        password: 'root',
        server: "192.168.1.114",
        database: 'ChatEDriver',
        options: {
            encrypt: false // Use this if you're on Windows Azure
        }
    }
};