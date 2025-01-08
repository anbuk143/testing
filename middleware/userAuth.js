const usercollection = require("../model/userModel");

module.exports = async function (req,res,next){
    try{
        
        if(req.session.loginSession || req.session.signupSession){
            const user = await userCollection.findOne({ email: req.session.user.email })
            if(user.isActive == false){
                req.session.block = true
                return res.redirect("/blocked")
            } else {
            next()
            }
        }else{
           return res.redirect('/login')
        }
    }catch(err){
        console.log("middleware: ", err);
    }
}