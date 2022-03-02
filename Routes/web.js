const express = require('express');
const router = express.Router();
const BookController = require('../Controllers/bookController');
const productController = require('../Controllers/productController');
const categoryController = require('../Controllers/categoryController');
const cartController = require('../Controllers/cartController');
const upload = require('../Middleware/upload')
const isAuth = require('../Middleware/isAuth');


router.get('/',isAuth,BookController.home);
router.get('/category-filter/:cat_id',isAuth,BookController.categoryFilter);

router.get('/login',BookController.viewLogin);
router.post('/login',BookController.loginUser);

router.get('/signup',BookController.viewSignup);
router.post('/signup',BookController.signupUser);

router.get('/logout',BookController.logout);

router.get('/insert',isAuth,productController.insertPage)
router.post('/insert',upload.single('image'),productController.productInsert)

router.get('/View/:id',productController.viewProduct);

router.get('/category',isAuth,categoryController.index);
router.post('/category',categoryController.store);
router.get('/delete/:id',isAuth,categoryController.delete);

router.get('/cart',cartController.cart);
router.get('/addtocart/:pro_id',cartController.AddToCart);
router.get('/remove-to-cart/:pro_id',cartController.RemoveCart);
module.exports = router