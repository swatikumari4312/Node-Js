const mongoose = require('mongoose');
const bcrypt= require('bcrypt');

const personSchema = new mongoose.Schema({
    name :{
        type:String,
        required : true
    },
    age : {
        type : Number
    },
    work :{
       type : String,
       enum :['chef','waiter','Manager'],
       require :true 
    },
    mobile :{
        type : String,
        required : true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    username:{
        require: true,
        type: String
    },
    password:{
        require:true,
        type: String
    }

});

personSchema.pre(save, async function(next){
    const person = this;
    if(!person.isModified('password')) return next();

    try{
        //    hash password generator
        const salt = await bcrypt.genSalt(10);
    //    hash passsword
    const hashpassword = await bcrypt.hash(person.password,salt);
    person.password= hashpassword;
      next();
    }catch(err){
        return next(err);
    }
})



//Create person model

const Person = mongoose.model('Person', personSchema);
module.exports = Person;