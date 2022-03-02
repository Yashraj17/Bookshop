const mongoose = require('mongoose')

const categoeryShema = mongoose.Schema({
    cat_title:{
        type:String,
        require:true
    },
    cat_description:{
        type:String,
        require:true
    }
})
const  categoryModel= mongoose.model('category',categoeryShema);
module.exports = categoryModel;