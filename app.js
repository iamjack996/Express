const express = require('express');
const app = express(); 

const path = require('path');

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Start Server
app.listen(1234, () => {
    console.log('Server is up and running on port numner ' + 1234);
});

// DB Connect
// (1) Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/product'); // DB.Name

let mongoosedb = mongoose.connection;

// Check Connection
mongoosedb.on('open', function(err){
	console.log('Connected to MongoDB! OK~');
});
// Check For DB Errors
mongoosedb.on('error', function(err){
	console.log(err);
});

// (2) Mongodb
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/product', (err, client) => {
  if (err) return console.log(err)
	  db = client.db('product') // database name is
	  app.listen(3000, () => {
	   	console.log('listening on 3000')
	  })
})

// For Form Request Use BodyParser
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
const product = require('./routes/product.route'); // Imports routes for the products
app.use('/products', product); // 引入路由 +前綴
const article = require('./routes/article.route');
app.use('/articles', article);


// Express Session Middleware
const session = require('express-session');

app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true,
	// cookie: { secure: true } 
}))

// Express Messages Middleware
const flash = require('connect-flash');

app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

var cookieParser = require('cookie-parser');

// app.use(require('connect-flash')());
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());



// Part8 - 12:20
// https://www.youtube.com/watch?v=rBzCvbA0Dls&list=PLillGF-RfqbYRpji8t4SxUkMxfowG4Kqp&index=8

//////



const methodOverride = require('method-override');
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));



// app.use(cookieParser());
// app.use(session({
//   secret: 'keyboard cat',
//   cookie: { maxAge: 60000 },
//   resave: false,    // forces the session to be saved back to the store
//   saveUninitialized: false  // dont save unmodified
// }));
// app.use(flash());


app.use('/public', express.static('public')); // 依賴資源檔






app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/chat', (req, res) => {
  // res.sendFile(__dirname + '/chat.html')
  res.render('chat')
})