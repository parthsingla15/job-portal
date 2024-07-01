const mongoose=require('mongoose');

const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    age:{
        type:Number,
        required:true,
    },

    email:{
        type: String,
        
    },
    mobile:{
        type:String,
    },
   
    password:{
        required:true,
        type:String,
    },
    //role:{
     //   type:String,
      //  enum:['job seeker ','employer'],
       
   // },
   
    

})




userSchema.pre('save',async function(next){
    const User=this;
    if(!User.isModified('password')) return next();
    try{
        const salt=await bcrypt.genSalt(10);


         const hashedPassword =await bcrypt.hash(User.password,salt)
         this.password=hashedPassword;
        next();

    }
    catch(err){
        return next(err)

    }
})
userSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch

    }catch(err){
        throw err;
    }

    
};



const User=mongoose.model('User',userSchema);
module.exports=User;