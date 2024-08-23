const express = require('express')
const app = express();
const db = require('./db');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');


// const Person = require('./models/Person');
// const menu = require('./models/Menu');



const bodyParser = require('body-parser');
app.use(bodyParser.json());


// Middle ware function 
const logRequest = (req,res ,next)=>{
  // console.log(`[${new Date().toLocalString()}] Request Made to : ${req.originalUrl}`);
  console.log(new Date().toLocaleString());

  next();
};
app.use(logRequest);


//authentication logic here

passport.use(new LocalStrategy(async (USERNAME, password, done) =>{
  try{
       console.log('Received credentials:',USERNAME , password);
       const user = await Person.findOne({username: USERNAME});
       if(!user)
        return done(null , false ,{message: 'Incorrect username'});
       
       const isPasswordMatch = user.password === password ? true : false;
       if(isPasswordMatch){
        return done(null,user);
       }else{
        return done(null,false, {message: 'Incorrect password .'});

       }

  }catch(err){
    return done(err);

  }
}));

app.use(passport.initialize());


app.get('/',passport.authenticate('local',{session:false}),function (req, res) {
  res.send('Hello World!! so how are you all guys');
})



// // Post route to add a person
// app.post('/person', async (req, res)=>{

//   try{
//     const data = req.body

//     //create a new person data usnig the mongoose model
//    const newPerson = new Person(data);


//    const response = await newPerson.save();
//    console.log('data save successfully');
//       res.status(200).json(response);


//   }
//   catch(err){
//     console.log(err);
//     req.status(500).json({error: 'Internal server error'});
    
//   }
// })





// app.post('/menu', async (req, res)=>{

//   try{
//     const data = req.body

//     //create a new person data usnig the mongoose model
//    const newMenu = new menu(data);


//    const response = await newMenu.save();
//    console.log('data save successfully');
//       res.status(200).json(response);


//   }
//   catch(err){
//     console.log(err);
//     req.status(500).json({error: 'Internal server error'});
    
//   }
// })





//   app.get('/person', async (req, res)=>{

//     try{
//       const data = await Person.find();
//       console.log('data fetched');
//       res.status(200).json(data);
  
//     }catch(err){
//       console.log(err);
//       req.status(500).json({error: 'Internal server error'});
      
//     }
    
//   // it is use to fetch the data contain by person
//   // const data =req.body

//   //  //create a new person data usnig the mongoose model
//   //  const newPerson = new Person(data);

//   // //  save teh new person to the database
//   // newPerson.save((error,savedPerson) =>{
//   //   if(error){
//   //     console.log('Error saving person:', error);
//   //     req.statusCode(500).json({error: 'Internal server error'})
//   //   }else{
//   //     console.log('data save successfully');
//   //     res.status(200).json(savedPerson);
//   //   }
//   // })

//   // it is lengthy process to show the data so we above use mongoose
//   // const newPerson = new Person();
//   // newPerson.name = data.name;
//   // newPerson.age = data.age;
//   // newPerson.work = data.work;
//   // newPerson.mobile = data.mobile;
//   // newPerson.email = data.email;
// })

// app.get('/person/:workType' ,async (req ,res )=>{
//   try{
//     const workType = req.params.workType; //Extract the worktype from the url
//     if(workType == 'chef' || workType =='Manager' || workType== 'waiter'){
      
//         const response = await Person.find({work: workType});
//         console.log('response fetched');
//         res.status(200).json(response);

//     }else{
//       res.status(404).json({error: 'Invalid work type error'});
//     }

//   }catch (err){
//     console.log(err);
//       req.status(500).json({error: 'Internal server error'});
      
//   }
// })


//Import the router


const personRoutes =require('./routes/personRoutes');
const menuItemsRoutes = require('./routes/menuRoutes');


// Use the routers 

app.use('/person' , personRoutes);
app.use('/menu' , menuItemsRoutes);


app.listen(3000, ()=> {
  console.log('lisenting on port 3000');
});


// app.listen(3000);