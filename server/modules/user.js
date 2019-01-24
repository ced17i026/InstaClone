const mongoose = require("mongoose"),
    bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    following:[{
        type: mongoose.Schema.Types.ObjectId,
    }],
    following:[{
        type: mongoose.Schema.Types.ObjectId,
    }],
    messageSent:[{
        type: mongoose.Schema.Types.ObjectId,
        body: String,
    }],
    messageRecived:[{
        type: mongoose.Schema.Types.ObjectId,
        body: String,
    }]
})

userSchema.pre("save",function(next){
    if(!this.isModified(this.password)){
        next();
    }else{
        const hashedPassword = bcrypt.hash(this.password,10);
        this.password = hashedPassword;
    }
})

userSchema.methods.comparePassword = function(input,next){
    const compare = bcrypt.compare(input,this.password);
    if(compare){
        next();
    }else{
        next({
            status: 400,
            message: "Wrong username/password",
        })
    }
}

module.exports = mongoose.model("user",userSchema);