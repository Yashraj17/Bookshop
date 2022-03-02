
module.exports = isAuth = (req,res,next)=>{
    if(req.session._id){
        next();
    }
    else{
        res.redirect('/login')
    }
};