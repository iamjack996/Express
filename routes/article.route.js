const express = require('express');
const router = express.Router();
module.exports = router;

const article_controller = require('../controllers/article.controller');


router.get('/', article_controller.index);

router.post('/create', article_controller.store);