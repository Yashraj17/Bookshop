const userModel = require('../Model/user')
const productModel = require('../Model/product')
const orderModel = require('../Model/order')
const bcrypt  = require('bcrypt');
const categoryModel = require('../Model/category');
class BookController{

    static home = async (req,res)=>{
            try {
                const product = await  productModel.find({}).populate('category');
                const category = await  categoryModel.find({});
                const cartItems = await orderModel.findOne({'userId':req.session._id,'status':false});
                if (cartItems!=null) {
                    const UserProducts = cartItems.products
                const count = UserProducts.length
                res.render('home',{data:product,
                                   cat:category,
                                NoOfProducts : count });
                } else {
                    res.render('home',{data:product,
                        cat:category,
                     });
                }
            } 
            catch (error) {
                console.log('something error');
            }
        }
        
    static categoryFilter = async (req,res)=>{
            try {
                const cat_id = req.params.cat_id;
                const product = await  productModel.find({category:cat_id}).populate('category');
                const category = await  categoryModel.find({});

                res.render('home',{data:product,
                                   cat:category });
            } 
            catch (error) {
                console.log('something error');
            }
        }
    static viewLogin=(req,res)=>{
        res.render('login');
    }

    static viewSignup=(req,res)=>{
        res.render('signup')
    }
    
    static signupUser=async (req,res)=>{
        const hashPassword = await bcrypt.hash(req.body.password,10);
      try {
          const userCollection = new userModel({
              name:req.body.name,
              email:req.body.email,
              password:hashPassword,
          })
          await userCollection.save();
          console.log('data inserted');
          res.redirect('/login');
      } catch (error) {
          console.log("data not inserted");
      }
    }
    static loginUser = async (req,res)=>{
        try {
            const {email,password} = req.body;
            const result = await userModel.findOne({email:email})
            if (result != null) {
                const isMatch = await bcrypt.compare(password,result.password);
                if (result.email==email && isMatch) {
                    req.session._id = result._id;
                    console.log(req.session._id);
                    res.redirect("/")
                }
                else{
                    res.send('invaild email or password')
                }
            }
            else{
                res.send("you are not a registered member")
            }
        } catch (error) {
            console.log(error);
        }
    }

    static logout = (req,res)=>{
        req.session.destroy(function (error) {
            if (error) {
                console.log("session not deleted");
            }
            else{
                res.redirect('/login');
            }
        })
    }

}
module.exports = BookController