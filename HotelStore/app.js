var express = require("express"),
    app = express(),
    passport = require("passport"),
    body = require("body-parser"),
    LocalStrategy = require("passport-local"),
    Hotel = require("./models/hotels"),
    User = require("./models/user"),
    Comment = require("./models/comments")


app.use(express.static("public"));
app.set("view engine" , "ejs");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Banaras_Project', {
      useNewUrlParser: true,
      useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


app.use(require("express-session")({
	secret:"The name is bond",
	resave:false,
	saveUninitialized:false
}))

app.use( body.urlencoded({extended:true}));
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next()
})
    
app.get("/" , function(req,res){
    res.render("booking")
})


Hotel.create({
    name:"Chandan Bhaiya ka room",
    img:"banaras1.jpg",
    description:"Bhut hi sasta aut tikauu ",
    address:"Shaitaan Gali , Khatra Mahal , Shamsaan ke Samnee ",
    price:"300rs/Night"

}, function(err,hotel){
    if(err){
        console.log(err)
    }else{
        console.log(hotel)
    }
});

app.get("/hotels" , function(req,res){
    Hotel.find({} , function(err , allHotels){
       if(err){
           console.log(err)
       } else{
           res.render("Hotels" , { hotel:allHotels , currentUser:req.user })
       }
    })
});



app.get("/hotels/:id" , function(req,res){

    Hotel.findById(req.params.id , function(err,foundhotels){
        if(err){
            console.log(err)
        }else{

            res.render("show" , { Hotel : foundhotels })
        }
    })



})

















app.get("/register" , function(req,res){
    res.render("register")
})
app.post("/register",function(req,res){

	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			console.log(err)
			return res.render("register")
		}else{
			passport.authenticate("local")(req,res,function(){
				res.redirect("/")
			})
		}

	})

})



app.get("/login",function(req,res){
	res.render("login");
})

app.post("/login"  , passport.authenticate("local" , {
    
	successRedirect:"/",
	failureRedirect:"/login"

})  , function(req,res){

})

app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
})











app.listen("3000" , function(req,res){
    console.log("Banaras is running!!")
})