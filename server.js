    var express    = require('express')
    var app        = express()
    var passport   = require('passport')
    var session    = require('express-session')
    var bodyParser = require('body-parser')
    var env        = require('dotenv').load()
    var exphbs     = require('express-handlebars')
    var models = require("./app/models");
    var authRoute = require('./app/routes/auth.js')(app,passport);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({ secret: 'sister love',resave: true, saveUninitialized:true})); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions

    app.set('views', './app/views')
    app.engine('hbs', exphbs({extname: '.hbs'}));
    app.set('view engine', '.hbs');
    app.get('/', function(req, res){
	  res.send('Welcome to Passport with Sequelize');
	});

    //load passport
    require('./app/config/passport/passport.js')(passport,models.user);

    //Sync Database
   	models.sequelize.sync().then(function(){
    console.log('Database is looking good.')

    }).catch(function(err){
    console.log(err,"Something went wrong with the Database Update!")
    });

	app.listen(9001, function(err){
		if(!err)
		console.log("Login System Live"); else console.log(err)
	});