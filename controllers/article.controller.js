const Article = require('../models/article.model');


exports.index = function (req, res) {

    Article.find({}, function(err, result) {
        res.render('article', {data: result});
    });
};


exports.store = function (req, res) {
    console.log(req.body);

    let article = new Article({
        title:req.body.title,
        author:req.body.author,
        content:req.body.content
    });

    article.validate(function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });

    article.save(function (err) {
        if (err) {
            console.log(err);
            return;
        } else {
            res.redirect('/articles')
        }
    });

    
};