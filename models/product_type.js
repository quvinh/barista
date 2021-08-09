const mongoose = require('mongoose')

const Product_type = mongoose.model('Product_type', {
    name: {
        type: String,
        trim: true,
        require: true
    },
    user_id: {
        type: String,
        require: true
    }
})

module.exports = { Product_type }