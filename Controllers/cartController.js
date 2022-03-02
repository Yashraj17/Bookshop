const productModel = require('../Model/product');
const categoryModel = require('../Model/category');
const orderModel = require('../Model/order');

// class cartController{
//     static addtocart = async (req,res)=>{
//         const pro_id = req.params.pro_id;
//     const product = await productModel.findById(pro_id);
//         const title = product.title;
//         const price = product.price;
//         const user_id = req.session._id; 
//         try {
//             const order = await orderModel.findOne({ user_id });
//             console.log(order);
//             if (order!=null) {
//                 // .findIndex(p => p.productId == pro_id);
//                 // let itemIndex = order.products.
//                     const itemIndex = order.products.findIndex(p => p.productId == pro_id);

//                 console.log(itemIndex);
//                 if (itemIndex > -1) {
//                     //product exists in the cart, update the quantity
//                     let productItem = order.products[itemIndex];
//                     // productItem.qty += 1;
//                     productItem.qty = productItem.qty + 1;
//                     // order.products[itemIndex] = productItem;
//                    await order.products[itemIndex].save().then(() => {console.log('qty updated');})
//                   } else {
//                     //product does not exists in cart, add new item
//                           order.products.push({ pro_id, title,price});
//                           order.save().then(()=>{
//                               console.log('new order inserted');
//                           })
//                   }
//                 //   order = await order.save();
//                 return res.status(201).send(order);
//                   console.log(order);
//             } else {
//                 const newOrder = orderModel.create({
//                     userId:user_id,
//                     products: [{ pro_id,title,price}]
//                   });
//                   await newOrder.save().then(()=> {
//                       console.log('new user and item inserted');
//                   })
//                 //   return res.status(201).send(newOrder);
//                   console.log(newOrder);
//             }
//         } catch (error) {
//             console.log(error);
//             res.status(500).send(error);
//         }
//     }
// }
// module.exports = cartController;

class cartController{
    static cart = async (req,res) =>{
        const user = req.session._id;
        const cartItems = await orderModel.findOne({'userId':user,'status':false});
       const my = await orderModel.aggregate([
        {
    
            $lookup:{
                from:'products',
                localField:'products.productId',
                foreignField:'_id',
                as:'Anything'
            },
          
        }
       ])
        // const myproduct = my.Anything 
        //     const title = myproduct
        console.log(my.products);
        if (cartItems != null) {
            const UserProducts = cartItems.products
            const count = UserProducts.length
                     res.render('cart',{
                         cartpro:UserProducts,
                         NoPro : count,
                             });
                 }   
                 else{
              res.send('No products found in yout cart')
    } 

    }
    static AddToCart =async (req,res) =>{
        const pro_id = req.params.pro_id;
        const product = await productModel.findById(pro_id)
        const title = product.title;
        const price = product.price;
        const user_id = req.session._id
        
        try {
            const cart =await orderModel.findOne({'userId':user_id})
            if (cart != null) {
                const itemIndex = cart.products.findIndex(p => p.productId == pro_id);
                console.log(itemIndex);
                if (itemIndex > -1) {
                    var  productItem = cart.products[itemIndex]
                     productItem.qty = productItem.qty + 1;
                    cart.save();
                    res.redirect('back')
                }
                else{
                    cart.products.push({
                        productId:pro_id,
                        name:title,
                        price:price
                    })
                    cart.save().then(()=>{
                        console.log('new product inserted');
                        res.redirect(`${"/View/"+pro_id}`);
                    }).catch(()=>{
                        console.log('something is worng');
                    })
                }
            } else {
                var data = await orderModel.create({
                    userId:user_id,
                    products:[
                        {
                            productId:pro_id,
                            name:title,
                            price:price
                        }
                    ]
                })
                     data.save().then(()=>{
                    console.log('data inserted in cart');
                    res.redirect(`${"/View/"+pro_id}`);
                }).catch((error)=>{
                    console.log(error.message);
                })
            }
        } catch (error) {
            console.log(error.message);
        }
       
    }
    static RemoveCart = async (req,res)=>{
        const pro_id = req.params.pro_id;
        const user = req.session._id;
        try {
            const cartItems = await orderModel.findOne({'userId':user})
            const itemIndex = cartItems.products.findIndex(p => p.productId == pro_id)
            if (itemIndex > -1) {
                var  productItem = cartItems.products[itemIndex]
                if ( productItem.qty > 1) {
                    productItem.qty = productItem.qty - 1;
                    cartItems.save();
                    res.redirect('back')
                } else {
                    cartItems.products[itemIndex].remove();
                    console.log('hii there');
                    cartItems.save();
                    res.redirect('back')
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

}
module.exports = cartController;