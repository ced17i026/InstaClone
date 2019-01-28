const db = require("../modules/index"),
    jwtToken = require("jsonwebtoken");
exports.signup = async function(req,res,next){
    try{
        const user = await db.user.create(req.body);
        const{_id,username,email,followers,following,profiePic} = user;
        const token = jwtToken.sign({
            _id,
            username,
            email,
            profilePic,
            followers:followers.length,
            follwing:following.length,
        },process.env.SECRET_KEY);
        return res.status(200).json({
            _id,
            username,
            email,
            profilePic,
            followers:followers.length,
            follwing:following.length,
            token
        })
    }catch(err){
        if(err.code === 11000){
            err.message = "Username or Email already exist"
        }else{
            err.message = "Cannot signup Successfully, Error occurred"
        }
        return next({
            ...err,
            status: 400,
            message: err.message
        })
    }
}

exports.signin = async function(req,res,next){
    try{
        const {email,password} = req.body;
        let user = await db.user.findOne({email: email});
        let passwordCheck = await user.comparePassword(password);
        if(passwordCheck){
            const{_id,username,email,followers,following,profilePic} = user;
            const token = jwtToken.sign({
                _id,
                username,
                email,
                profilePic,
                followers:followers.length,
                follwing:following.length,
            },process.env.SECRET_KEY);
            return res.status(200).json({
                _id,
                username,
                email,
                profilePic,
                followers:followers.length,
                following:following.length,
                token
            })
        }else{
            return next({
                status: 401,
                message: "wrong username or password",
            })
        }
    }catch(err){
        return next({
            ...err,
            status:401,
            message: "Something went wrong while sign in",
        })
    }
}