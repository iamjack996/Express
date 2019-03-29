const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
	
	db.collection('products').find({}).sort({ price: -1 }).toArray(function(err, result) {
    	if (err) return console.log(err)
		    console.log('find All')
		    res.render('test',{data : result});
	  })

	// res.render('test',{data : data});
    // res.send('Greetings !!! from the Test controller! HELLO');
};


exports.chat = function (req, res) {
	res.sendFile(__dirname + 'views/chat.html')
};



exports.product_create = function (req, res) {

	// (1)
    // let product = new Product(
    //     {
    //         name: req.body.name,
    //         price: req.body.price
    //     }
    // );

    // product.save(function (err) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.send('Product Created successfully')
    // })


	// (2)
    db.collection('products').save(req.body, (err, result) => {
    	if (err) return console.log(err)
		    console.log('saved to database')
		    res.redirect('/products/test')
		    // res.redirect('/')
	  })

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
        res.send('Product udpated.');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.redirect('/products/test')
        // res.send('Deleted successfully!');
    })
};

