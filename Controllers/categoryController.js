const categoryModel = require('../Model/category');

class categoryController{
    static index =async (req,res)=>{
        try {
            var results = await categoryModel.find({})
        res.render('category',{data:results});
        } catch (error) {
            throw error;
        }
    }
    static store = async (req,res)=>{
        try {
            var categoryCollection = new categoryModel({
                cat_title : req.body.cat_title,
                cat_description : req.body.cat_description
            })
            await categoryCollection.save();
            console.log('category data inserted');
                res.redirect('/category')
        } catch (error) {
            console.log("data not inserted");
        }
    }
    static delete = (req,res)=>{
        var id = req.params.id;
        categoryModel.deleteOne({"_id":id},function (error) {
            if (error) {
                throw error
            }
            else{
                res.redirect('/category');
            }
        });
        
    }
}
module.exports = categoryController;