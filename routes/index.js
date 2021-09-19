const express = require('express')
const router = express.Router()

const {Product} = require('../models/product')
// const {User} = require('../models/user')
const {Product_type} = require('../models/product_type')
const User = require('../models/user')
const passport = require('passport')

// const mongodbClient = require('../config/mongodbClient')
// const { emit } = require('../models/user')
const user = require('../models/user')

const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGO_URI;

//----------------------------
router.get('/', async (req, res) => {
    res.render('../views/page/home.ejs', {user: req.user})
})
//----------------------------

//====================================================================
//                              USER
//====================================================================

router.get('/userprofile', isLoggedIn, (req, res) => {
    res.render('../views/user/userprofile.ejs', {user: req.user})
})

router.get('/login', (req, res) => {
    res.render('../views/user/login.ejs')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/userprofile',
    failureRedirect: '/login'
}),function(req, res){})

router.get('/register', (req, res) => {
    res.render('../views/user/register.ejs')
})

router.post('/register', (req, res) => {
    User.register(new User({
        username: req.body.username,
        phone: req.body.phone
    }), req.body.password, function(e, user){
        if(e){
            console.log(e)
            res.render('../views/user/register.ejs')
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/login')
        })
    })
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}


//====================================================================
//                              PRODUCT
//====================================================================


//Get all product---------------------------------------------
router.get('/product', isLoggedIn, async (req, res) => {
    const product = await Product.find({ user_id: req.user._id })
    res.render('../views/product/index.ejs', {product: product})
})

//Get simple product
router.get('/product/:id', isLoggedIn, async (req, res) => {
    // const product = await Product.findById(req.params.id)
    // res.render('../views/product/simple_product.ejs', {product : product})
    Product.findById(req.params.id, function(e, product){
        Product_type.findById(product.product_type_id, function(e, product_type){
            res.render('../views/product/simple_product.ejs', {product : product, product_type: product_type})
        })
    })
})

//Edit product
router.get('/product/edit/:id', isLoggedIn, async (req, res) => {
    // const product = await Product.findById(req.params.id)
    // res.render('../views/product/edit_product.ejs', {product : product})
    Product.findById(req.params.id, function(e, product){
        Product_type.find({user_id: req.user._id}, function(e, product_type){
            res.render('../views/product/edit_product.ejs', {product : product, product_type: product_type})
        })
    })
})

//Update product
router.put('/product/edit/:id', (req, res) => {
    const product = {
        user_id: req.user._id,//
        product_type_id: req.body.product_type_id,//
        name: req.body.name,
        milk: {
            milk_size_m: req.body.milk_size_m,
            milk_size_l: req.body.milk_size_l
        },
        milk_powder: {
            milk_powder_size_m: req.body.milk_powder_size_m,
            milk_powder_size_l: req.body.milk_powder_size_l
        },
        sugar: {
            sugar_size_m: req.body.sugar_size_m,
            sugar_size_l: req.body.sugar_size_l
        },
        more: {
            more_name: req.body.more_name,
            more_size_m: req.body.more_size_m,
            more_size_l: req.body.more_size_l
        },
        hot_water: {
            hot_water_size_m: req.body.hot_water_size_m,
            hot_water_size_l: req.body.hot_water_size_l
        },
        tea: {
            tea_size_m: req.body.tea_size_m,
            tea_size_l: req.body.tea_size_l
        }
    }
    Product.findByIdAndUpdate(req.params.id, {$set: product}, (e, data) => {
        if(!e){
            // console.log(`send request`)
            // res.status(200).json({ code: 200, message: 'Product updated succesfully', updateProduct: data })
            res.redirect(`/product/${req.params.id}`)
            
        }else{
            console.log(e)
        }
    })
})

//New product
router.get('/new/product', isLoggedIn, (req, res) => {
    Product_type.find({user_id: req.user._id}, function(e, product_type) {
        res.render('../views/product/new.ejs', {product: new Product(), product_type: product_type})
    })
    
})
// router.get('/new/product', async (req, res) => {
//     const product_type = await Product_type.find()
//     res.render('../views/product/new.ejs', {product_type: product_type })
// })
// function getNameProductType() {
//     Product_type.find({}, function(e, data) {
//         const product_type = {}

//         data.forEach(function(i) {
//             product_type[pro._id] = i
//         })
//         res.send(product_type)
//     })
// }

//Save product
router.post('/product', (req, res) => {
    const product = new Product({
        user_id: req.user._id,
        product_type_id: req.body.product_type_id,
        name: req.body.name,
        milk: {
            milk_size_m: req.body.milk_size_m,
            milk_size_l: req.body.milk_size_l
        },
        milk_powder: {
            milk_powder_size_m: req.body.milk_powder_size_m,
            milk_powder_size_l: req.body.milk_powder_size_l
        },
        sugar: {
            sugar_size_m: req.body.sugar_size_m,
            sugar_size_l: req.body.sugar_size_l
        },
        more: {
            more_name: req.body.more_name,
            more_size_m: req.body.more_size_m,
            more_size_l: req.body.more_size_l
        },
        hot_water: {
            hot_water_size_m: req.body.hot_water_size_m,
            hot_water_size_l: req.body.hot_water_size_l
        },
        tea: {
            tea_size_m: req.body.tea_size_m,
            tea_size_l: req.body.tea_size_l
        }
    })

    // product.save()
    // res.redirect(`product/${req.params.id}`)
    return product
    .save(function(e, newProduct) {
        if(e){
            return res.redirect(`new/product`)
        }else{
            return res.redirect('product/' + newProduct.id)
        }
    })
    // .then(() => {
    //     return res.status(201).json({
    //         success: true,
    //         message: 'Created successfully',
    //         Product: newProduct
    //     })
    // })
    // .catch((e) => {
    //     console.log(e)
    //     res.status(500).json({
    //         success: false,
    //         message: 'Server error',
    //         error: error.message
    //     })
    // })
})

//Delete product
router.delete('/product/del/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
    res.redirect('/product')
})

//====================================================================
//                              PRODUCT TYPE
//====================================================================

//Get all product_type
router.get('/product_type', isLoggedIn, async(req, res) => {
    const product_type = await Product_type.find({user_id: req.user._id})
    res.render('../views/product_type/index.ejs', {product_type: product_type})
})

// //Get product_type
router.get('/product_type/:id', isLoggedIn, async(req, res) => {
    const product_type = await Product_type.findById(req.params.id)
    // if(product_type == null) res.redirect('/')
    res.render('../views/product_type/simple_product_type.ejs', {product_type: product_type})
})

//Edit product_type
router.get('/product_type/edit/:id', isLoggedIn, async(req, res) => {
    const product_type = await Product_type.findById(req.params.id)
    res.render('../views/product_type/edit_product_type.ejs', { product_type: product_type })
})

//Update product_type
router.put('/product_type/edit/:id', (req, res) => {
    const pro = {
        name : req.body.name,
        user_id: req.user._id
    }
    Product_type.findByIdAndUpdate(req.params.id, {$set: pro}, (e, data) => {
        if(!e){
            // res.status(200).json({ code: 200, message: 'Product_type updated succesfully', updateProduct_type: data })
            res.redirect(`/product_type/${req.params.id}`)
        }else{
            console.log(e)
        }
    })
})

//New product_type
router.get('/new/product_type', isLoggedIn, (req, res) => {
    res.render('../views/product_type/new.ejs', { product_type: new Product_type() })
})

//Save product_type
router.post('/product_type', (req, res) => {
    const product_type = new Product_type({
        name: req.body.name,
        user_id: req.user._id
    })
    product_type.save()
    res.redirect(`/product_type/${ product_type.id }`)
})

//Delete product_type
router.delete('/product_type/del/:id', async(req, res) => {
    await Product_type.findByIdAndDelete(req.params.id)
    res.redirect('/product_type')
})

//====================================================================
//                              TUTORIAL
//====================================================================
router.get('/tutorial', isLoggedIn, async(req, res) => {
    // const col = cb => {
    //     Product.listIndexes().toArray(cb);
    // }
    // console.log(col);
    
    // const moreName = await Product.find({user_id: req.user._id});
    // res.render('../views/page/tutorial.ejs', { moreName: moreName, user: req.user });
    Product.find({user_id: req.user._id}, function(e, moreName){
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db("db_barista");
            const ID = new String(req.user._id);
            const query = {user_id: ID.valueOf()};
            console.log(query);
            dbo.collection("products").find(query).toArray(function (err, result) {
                if (err) throw err;
                Product.find({user_id: req.user._id}).countDocuments().then((countDoc) => {
                    console.log(result);
                    res.render('../views/page/tutorial.ejs', { moreName: moreName, result: result, countDoc: countDoc});
                })
                db.close();
            })
        })
    })
})


module.exports = router