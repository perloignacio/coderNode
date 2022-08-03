const MongoStore=require("connect-mongo");
const session=require("express-session");
const LocalStrategy=require("passport-local").Strategy;
const usuarios =require('../models/usuarios');
const passport=require("passport");

let userObj=new usuarios();

let baseSession = session({
    store: MongoStore.create({
        mongoUrl: process.env.BD,
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
    }),
    key: process.env.KEY,
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: {maxAge: 6000000},
})
const initPassport=()=>{
  passport.use("login",new LocalStrategy(
		async (username,password,done)=>{
       
        let userobj=await userObj.login({email:username,contra:password});
        
        
			   if(!userobj.ok){
				  return done(null,false);	
			   }else{
           return done(null, userobj.data)
			   }
		  
	   }
   ));
   
   passport.serializeUser((usuario,done)=>{
	   
	   done(null,usuario._id)
   })
   passport.deserializeUser((id,done)=>{
	  
    userObj.getById(id).then((u)=>{
       
       done(null,u);
	   })
   });	
}

module.exports={baseSession,initPassport};