const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Migration
let ArticleSchema = new Schema({
    title: {
    	type: String, required: true
    },
    author: {
    	type: String, required: true
    },
    content: {
    	type: String, required: true
    },
});

// Export the model
module.exports = mongoose.model('Article', ArticleSchema);