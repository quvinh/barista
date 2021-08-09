const mongoose = require('mongoose')

const Product = mongoose.model('product', {
    user_id: {
        type: String,
        require: true
    },
    product_type_id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        trim: true,
        require: true
    },
    milk: {
        milk_size_m: { type: String, trim: true },
        milk_size_l: { type: String, trim: true }
        // type: Array,
        // default: []
        // size_m: String,
        // size_l: String
    },
    milk_powder: {
        milk_powder_size_m: { type: String, trim: true },
        milk_powder_size_l: { type: String, trim: true }
    },
    sugar: {
        sugar_size_m: { type: String, trim: true },
        sugar_size_l: { type: String, trim: true }
    },
    more: {
        more_name: { type: String, trim: true},
        more_size_m: { type: String, trim: true },
        more_size_l: { type: String, trim: true }
    },
    hot_water: {
        hot_water_size_m: { type: String, trim: true },
        hot_water_size_l: { type: String, trim: true }
    },
    tea: {
        tea_size_m: { type: String, trim: true },
        tea_size_l: { type: String, trim: true }
    }
})

module.exports = { Product }