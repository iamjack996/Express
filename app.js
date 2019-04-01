const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');
const product = require('./routes/product.route'); // Imports routes for the products

const session        = require('express-session'),
	  cookieParser   = require('cookie-parser'),
	  flash          = require('connect-flash');



//DB connect
// (1)
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/product'); // DB.name

// (2)
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/product', (err, client) => {
  if (err) return console.log(err)
	  db = client.db('product') // database name is
	  app.listen(3000, () => {
	   	console.log('listening on 3000')
	  })
})

// app.use(cookieParser());
// app.use(session({
//   secret: 'keyboard cat',
//   cookie: { maxAge: 60000 },
//   resave: false,    // forces the session to be saved back to the store
//   saveUninitialized: false  // dont save unmodified
// }));
// app.use(flash());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product); // 引入路由 +前綴
app.use('/public', express.static('public'));


app.set('view engine', 'ejs');

let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/views/chat.html')

})



