const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const router= require('./routes/index.js');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-unfetch');

//seting
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));   
app.set('view engine','ejs');     




//midware

app.use((req, res, next) => {
	console.log(`${req.url} - ${req.method}`);
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//routes
app.use(router);
//static files

//inicialzar servidor
app.listen(app.get('port'),() => console.log("SERVER ONLINE : ",app.get('port')));