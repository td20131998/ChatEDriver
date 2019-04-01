var config = require('../configuration');
module.exports=(function () {
    var lng = 'vn';
    return {
        set: function (myLng) {
            lng = myLng;
        },
        get: function () {
            return lng;
        },
        getDefaultLang: function (req) {
            let key = config.languages[req.query.lang];
            if(key && config.languages[req.query.lang]){
                return {code: key,name: config.languages[req.query.lang]}
            }
            return {code: 'EN',name: config.languages['EN']}
        }
    }
})()