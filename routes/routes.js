const express = require('express');
var fs = require('fs');
var bodyParser     = require("body-parser");
var ejs = require('ejs');
var config = require('../configuration');
var modelUser = require('../libs/model/ModelUser');
var  language = require('../config/language');

var crypto= require('crypto');
const sql = require('mssql');
module.exports = function(app,config,tokens,ROOT_DIR) {


// set the view engine to ejs
    app.set('view engine', 'ejs');

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

//enable public file
    app.use('/public', express.static('public'));

    app.get('/', (req, res) => {
        res.send('Chat Server is running on port 3000')
    });
    app.get('/js/client.js', (req, res) => {
        let fnCallback= req.query.callback;
        var file = "";
        file = ROOT_DIR + '/views/js/client.js';

        fs.readFile(file,'utf-8', function(err, data) {
            if (err) {
                res.writeHead(404);
                return res.end('Page or file not found');
            }
            var f = ejs.compile(data);
            var fileContent = f({fnCallback: fnCallback});
            res.setHeader('Content-Type', 'application/javascript');
            res.setHeader('Content-Length', fileContent.length);
            res.send(fileContent);
        });
    });

    app.get('/js/administrator.js', (req, res) => {
        let fnCallback= req.query.callback;
        var file = "";
        file = ROOT_DIR + '/views/js/administrator.js';

        fs.readFile(file,'utf-8', function(err, data) {
            if (err) {
                res.writeHead(404);
                return res.end('Page or file not found');
            }
            var f = ejs.compile(data);
            var fileContent = f({hostname: config.hostname,fnCallback:fnCallback});
            res.setHeader('Content-Type', 'application/javascript');
            res.setHeader('Content-Length', fileContent.length);
            res.send(fileContent);
        });
    });
    app.get('/js/administrator_embed.js', (req, res) => {
        var file = "";
        file = ROOT_DIR + '/views' + req.url;

        fs.readFile(file,'utf-8', function(err, data) {
            if (err) {
                res.writeHead(404);
                return res.end('Page or file not found');
            }
            var f = ejs.compile(data);
            var fileContent = f({hostname: config.hostname});
            res.setHeader('Content-Type', 'application/javascript');
            res.setHeader('Content-Length', fileContent.length);
            res.send(fileContent);
        });
    });

    app.get('/index.html', (req, res) => {
        let lng= req.query.lng;
        console.log(language.getDefaultLang(req));
        res.render('pages/index',{language:language});
    });

    app.post('/login', (req, res) => {
        var username=req.body.username;
        var password=req.body.password;
        modelUser.login({ Username: username }, function(user) {
            if(user!== false){
                let token = crypto.randomBytes(64).toString('hex');
                tokens[token] = new Date().getTime();
                res.json({
                    status:1,
                    data:{
                        user: user,
                        token: token
                    }
                });
            }else{
                res.json({
                    status:2,
                    message: 'User not exist'
                });
            }
        });
        // sql.connect(config.sql, err => {
        //     modelUser.login({Username:username},function (user) {
        //         if(user!== false){
        //             let token = crypto.randomBytes(64).toString('hex');
        //             tokens[token] = new Date().getTime();
        //             res.json({
        //                 status:1,
        //                 data:{
        //                     user: user,
        //                     token: token
        //                 }
        //             });
        //         }else{
        //             res.json({
        //                 status:2,
        //                 message: 'User not exist'
        //             });
        //         }
        //     })
        // });
    });

    app.post('/upload', function(req, res) {
        console.log(req.files.sampleFile);
        if (Object.keys(req.files).length == 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.sampleFile;

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(ROOT_DIR+'/public/uploads/'+sampleFile.name, function(err) {
            if (err)
                return res.status(500).send(err);
            res.send('<img src="http://localhost:3000/'+sampleFile.name+'">');
        });
    });
};



