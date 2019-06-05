const Product = require('../models/product.model');
const { check, validationResult } = require('express-validator/check');


//Simple version, without validation or sanitation
exports.test = function (req, res) {
	console.log(req.query);
											// $regex: '.*' + req.query.search + '.*'
	db.collection('products').find({ name: { $regex: '.*' + req.query.search + '.*' } }).sort({ price: -1 }).toArray(function(err, result) {
    	if (err) return console.log(err)
		    console.log('Find Search /' + result);
		    res.render('test',{ data : result });
	  })



		// db.collection('products').find({}).sort({ price: -1 }).toArray(function(err, result) {
  //   	if (err) return console.log(err)
		//     console.log('Find All')
		//     res.render('test',{data : result});
	 //  })
	
	
	// res.render('test',{data : data});
    // res.send('Greetings !!! from the Test controller! HELLO');
};


exports.chat = function (req, res) {
	res.sendFile(__dirname + 'views/chat.html')
};

exports.product_create = function (req, res) {

	const errors = validationResult(req);
        if (!errors.isEmpty()) {
        	// req.flash('message', errors.array());
            
console.log(errors.array());
            req.flash('messages',errors.array());
            res.redirect('/products/test')
        	// res.send(errors.array());
        }else {
            // (1)
            let product = new Product(
                {
                    name: req.body.name,
                    price: req.body.price
                }
            );

            product.save(function (err) {
                if (err) {
                    console.log(err);
                    // return next(err);
                }
                // res.send('Product Created successfully')
                req.flash('success','Product Created successfully');
                res.redirect('/products/test')
            })
        }


	// (2)
   //  db.collection('products').save(req.body, (err, result) => {
   //  	if (err) return console.log(err)
		 //    console.log('saved to database')
		 //    res.redirect('/products/test')
		 //    // res.redirect('/')
	  // })

};

exports.product_details = function (req, res) {
	
	// (1)
    // Product.findById(req.params.id, function (err, product) {
    //     if (err) return next(err);
    //     res.send(product);
    // })

    // Get All()
    // Product.find({}, function (err, product) {
    //     if (err) return next(err);
    //     res.send(product);
    // })


	var ObjectId = require('mongodb').ObjectID;
    // (2)
    // console.log(req.params.id);				// _id: ObjectId(req.params.id)
    db.collection('products').find({ price: { $gt: 100, $lt: 106} }).toArray(function(err, result) {
    	if (err) return console.log(err)
		    console.log('find All')
		    res.send(result);
	  })
    


};

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        // res.send('Product udpated.');
        console.log(req.body);
        res.redirect('/products/test')
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.redirect('/products/test')
        // res.send('Deleted successfully!');
    })
};

exports.product_search = function (req, res) {
	console.log(123);
    console.log(req);
    Product.find({ name: req.params.search}, function (err, product) {
        if (err) return next(err);
        res.redirect('/products/test')
    })
};

