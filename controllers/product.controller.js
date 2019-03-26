const Product = require('../models/product.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings !!! from the Test controller! HELLO');
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
		    res.redirect('/')
	  })

};

exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })

    // Get All()
    // Product.find({}, function (err, product) {
    //     if (err) return next(err);
    //     res.send(product);
    // })
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
        res.send('Deleted successfully!');
    })
};

