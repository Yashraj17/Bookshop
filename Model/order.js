const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    products:[
        {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'products'
        },
        name: String,
        price:Number,
        qty:{
            type:Number,
            default:1
        }
  
        }
    ],
    status:{
        type: Boolean,
        default:false,
    }
})
const orderModel = mongoose.model('order',orderSchema);
module.exports = orderModel