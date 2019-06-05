const express = require('express');
const router = express.Router();
module.exports = router;

const { check, validationResult } = require('express-validator/check');

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);

router.get('/chat', product_controller.chat);

router.post('/create', [ 
	check('name','名稱不可空').not().isEmpty(),
	check('name','名稱須大於2位元').isLength({ min: 3 }),
	check('price','價錢有誤/不可空').not().isEmpty().isInt()
	] ,product_controller.product_create);

router.get('/:id', product_controller.product_details);

router.put('/:id/update', product_controller.product_update);

router.delete('/:id/delete', product_controller.product_delete);
// api:delete /web:post

router.get('/search', product_controller.product_search);


// router.get('/test', (req, res) => {
//   res.render(test)
// })