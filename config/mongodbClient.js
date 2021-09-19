const MongoClient = require("mongodb").MongoClient;

const url = process.env.MONGO_URI;

const mongodbClient = MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const dbo = db.db("db_barista");
    dbo.collection("products").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    })
})
module.exports = mongodbClient

// const connectDB = require('./config/db')
// const mongodbClient = MongoClient.connect(url, function(e, db) {
//     if(e) throw e;
//     const dbo = db.db("db_barista");
//     dbo.listCollections().toArray(function(e, collectionInfos) {
//         collectionInfos.forEach(data => {
//             console.log(data.name);
//         })
//         db.close();
//     })
// })

// module.exports = mongodbClient;

// const mongodbClient = (
//     async function() {
//         const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
//         try {
//             await client.connect();
//             const col = client.db('db_barista').collection('products');
//             console.log(col.getIndexes())
//         } catch (e) {
//             console.log(e.stack);
//         }
//         client.close();
//     }
// )();

// module.exports = mongodbClient;

// const someValue = function(req, res, next) {
//     //query with mongoose
//     var query = dbSchemas.SomeValue.find({}).select('name -_id');

//     query.exec(function (err, someValue) {
//         if (err) return next(err);
//         // res.send(someValue);
//         console.log(someValue);
//     });
// };
// module.exports = someValue;
