const express=require('express');
const router=express.Router();
const User=require('./../models/userSchema')
const {jwtAuthMiddleware,generateToken}=require('./../jwt');


router.post('/signup',async(req,res)=>{
    try{
    const data=req.body;

    const newUser=new User(data);

    const response=await newUser.save();
        console.log('data saved');
        const payload={
          id:response.id,
          
        }


       const token=generateToken(payload);
console.log('token is :',token);

    res.status(200).json({response: response , token: token});

   }catch(err){
        console.log(err);
    res.status(500).json(err);
   }
   
})

router.get('/signup', jwtAuthMiddleware, async (req, res) => {
  try{
      const Data = req.user;
      const userId = Data.id;
      const user = await User.findById(userId);
      res.status(200).json({user});
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})



router.post('/login',async(req, res) => {
  try{

      const {name, password} = req.body;

  
      if (!name || !password) {
          return res.status(400).json({ error: 'name and password are required' });
      }

      
      const user = await User.findOne({name: name});

      if( !user || !(await user.comparePassword(password))){
          return res.status(401).json({error: 'Invalid name or password'});
      }

       
      const payload = {
          id:user.id,
      }
      const token = generateToken(payload);

      
      res.json({token})
  }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});






module.exports=router;