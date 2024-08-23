const express = require('express');
const router = express.Router();
// const menu = require('./../models/Menu');


router.post('/', async (req, res)=>{

    try{
      const data = req.body
  
      //create a new person data usnig the mongoose model
     const newMenu = new menu(data);
  
  
     const response = await newMenu.save();
     console.log('data save successfully');
        res.status(200).json(response);
  
  
    }
    catch(err){
      console.log(err);
      req.status(500).json({error: 'Internal server error'});
      
    }
  })



  router.get('/', async (req, res)=>{

    try{
      const data = await menu.find();
      console.log('data fetched');
      res.status(200).json(data);
  
    }catch(err){
      console.log(err);
      req.status(500).json({error: 'Internal server error'});
      
    }
})




  router.get('/:tasteType' ,async (req ,res )=>{
    try{
      const tasteType = req.params.tasteType; //Extract the tasteType from the url
      if(tasteType == 'sweet' || tasteType =='spicy' || tasteType== 'sour'){
        
          const response = await menu.find({taste:tasteType});
          console.log('response fetched');
          res.status(200).json(response);
  
      }else{
        res.status(404).json({error: 'Invalid work type error'});
      }
  
    }catch (err){
      console.log(err);
        req.status(500).json({error: 'Internal server error'});
        
    }
  })
  



module.exports = router;