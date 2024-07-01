const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const person=require('./models/person');


passport.use(new LocalStrategy(async(username,password,done)=>{

try{
  //console.log('recieved credentials',username,password);
  const user=  await(person.findOne({username: username}));
  if(!user){
    return done(null,false,{message:'incorrect username'})}
  const isPasswordmatch=await user.comparePassword(password);
  (user.password===password ? true : false);
  if(isPasswordmatch){
    return done(null,user)
  } else{
    return done(null,false,{message:'incorrect password'})
  }
}catch(err){
return done(err);
}





}))
module.exports=passport;