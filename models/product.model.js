const mongoose = require('mongoose'); // 引入支援mongo套件
const Schema = mongoose.Schema;

// Migration
let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
});

// Export the model
module.exports = mongoose.model('Product', ProductSchema);