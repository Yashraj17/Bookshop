const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    image:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    }
})
const  productModel= mongoose.model('products',productSchema);
module.exports = productModel;
