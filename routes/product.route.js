const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);

router.get('/chat', product_controller.chat);

router.post('/create', [ 
	check('name','名稱不可空,且字元須大於2').isLength({ min: 3 }).not().isEmpty(),
	check('price','價錢有誤/不可空').not().isEmpty().isInt()
	] ,product_controller.product_create);

router.get('/:id', product_controller.product_details);

router.put('/:id/update', product_controller.product_update);

router.post('/:id/delete', product_controller.product_delete);
// api:delete /web:post

router.get('/:id/deleteGet', product_controller.product_delete);


// router.get('/test', (req, res) => {
//   res.render(test)
// })

module.exports = router;

