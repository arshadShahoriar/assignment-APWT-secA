//declaration
const upload             = require('express-fileupload');
const express 			= require('express');	
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');
const cookieParser 		= require('cookie-parser');

const user				= require('./controllers/user');
const login				= require('./controllers/login'); //
const logout			= require('./controllers/logout');//
const home				= require('./controllers/home');
const registration			= require('./controllers/registration');
const campaigns				= require('./controllers/campaigns');
const owner				= require('./controllers/owner');
const customer				= require('./controllers/customer');
const products				= require('./controllers/products');
const bookmarks				= require('./controllers/bookmarks');
const profile			= require('./controllers/profile');
const $ = require('jquery');
const path = require('path');
const app				= express();
const port				= 3000;

//configuration
app.set('view engine', 'ejs');


//middleware
app.use('/abc', express.static('assets'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));
app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));  
app.use(express.static(path.join(__dirname+'/public'))); 
app.use(upload());

app.use('/user', user);
app.use('/login', login);
app.use('/home', home);
app.use('/logout', logout);
app.use('/registration', registration);
app.use('/campaigns', campaigns);
app.use('/owner', owner);
app.use('/customer', customer);
app.use('/products', products);
app.use('/bookmarks', bookmarks);
app.use('/profile', profile);

//router
app.get('/', (req, res)=>{
	res.send('Welcome to clothing brand');
});

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});