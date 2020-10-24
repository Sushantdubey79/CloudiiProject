var express = require("express"),
    app = express(),
    passport = require("passport"),
    body = require("body-parser"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
    Hotel = require("./models/hotels"),
    User = require("./models/user"),
    Comment = require("./models/comments"),
    cookieSession = require('cookie-session'),
    findOrCreate = require("mongoose-findorcreate"),
    flash = require("connect-flash");




app.use(express.static("public"));
app.set("view engine" , "ejs");
app.use(methodOverride("_method"));


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Banaras_Project', {
      useNewUrlParser: true,
      useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


 
app.use(cookieSession({
    name: 'HotelStore-session',
    keys: ['key1', 'key2']
  }))
   

app.use(require("express-session")({
	secret:"The name is bond",
	resave:false,
	saveUninitialized:false
}))


app.use( body.urlencoded({extended:true}));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
	next();
})

passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


passport.serializeUser(function(user,done){
done(null,user.id)
})
passport.deserializeUser(function(id,done){
User.findById(id,function(err,user){
    done(err,user)
})
})


app.get('/auth/google',
  passport.authenticate('google', { scope:['profile','email'] }));

//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res ,next){
    res.redirect('/');
  });


  passport.use(new GoogleStrategy({
    clientID: '69066812416-44u9s1o8qs4bl1llrpq08nlvtrj6qfip.apps.googleusercontent.com',
    clientSecret: '86Y7OjNcKDtSJr1L11zIXxr7',
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));


    
app.get("/" , function(req,res){
    res.render("booking")
})

/*
Hotel.create({
    name:"Chandan Bhaiya ka room",
    img:["banaras1.jpg","banaras3.jpg" ],
    description:"Bhut hi sasta aut tikauu ",
    address:"Shaitaan Gali , Khatra Mahal , Shamsaan ke Samnee ",
    price:"300rs/Night"

}, function(err,hotel){
    if(err){
        console.log(err)
    }else{
        console.log(hotel)
    }
});*/



app.get("/hotels/newHotel", isLoggedIn ,function(req,res){
    res.render("new")
})

app.post("/hotels" , isLoggedIn,function(req , res){
    var name = req.body.name;
    var price = req.body.price;
    var img1 = req.body.image1;
    var img2 = req.body.image2;
    var img3 = req.body.image3;
    var img4 = req.body.image4;
    var desc = req.body.description;
    var address = req.body.address;
	var author = {
		id: req.user.id ,
		username: req.user.username
	}
	var newHotel = {name:name , img1:img1 ,price:price, img2:img2,img3:img3, img4:img4, description:desc , address:address, author:author} 
	Hotel.create(newHotel , function(err , newlyHotel){
		if(err){
			console.log(err)
		}else{
            req.flash("success","Successfully added Hotel")
			res.redirect("/hotels")
			
		}
	})
})




app.get("/hotels" , function(req,res){
    Hotel.find({} , function(err , allHotels){
       if(err){
           console.log(err)
       } else{
           res.render("Hotels" , { hotel:allHotels , currentUser:req.user })
       }
    })
});


app.get("/hotels/:id",function(req,res){

    Hotel.findById(req.params.id).populate("comments").exec(function(err,foundhotel){
        if(err){
            console.log(err)
        }else{
            res.render("bookingpage" , { Hotel : foundhotel })
        }
    })



})





app.get("/hotels/:id/comments/new", isLoggedIn ,function(req,res){

    Hotel.findById(req.params.id , function(err,hotel){
    res.render("comments/new" , {hotel:hotel});
    })
})

app.post("/hotels/:id/comments", isLoggedIn ,function(req,res){

    Hotel.findById(req.params.id , function(err,hotel){
        if(err){
            console.log((err))
            res.redirect("/hotels")
        }else{
            Comment.create(req.body.comment , function(err,comment){
                if(err){
                    console.log(err)
                    res.redirect("/hotels")
                }else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save()
                    hotel.comments.push(comment)
                    hotel.save()
                    req.flash("success","Successfully added comment")
                    res.redirect("/hotels/"+hotel._id)
        
                }
            })


        }
    })

})

app.get("/hotels/:id/comments/:comment_id/edit" , checkOwnership ,function(req,res){
  
    Comment.findById(req.params.comment_id , function(err,foundComment){
        if(err){
            console.log(err)
        }else{
               res.render("comments/edit" , {Hotel_id:req.params.id , comment:foundComment})
        }
    })

})

app.put("/hotels/:id/comments/:comment_id" ,checkOwnership ,function(req,res){


    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateComment){
        if(err){
            console.log(err)
        }else{
            res.redirect("/hotels/"+req.params.id)
        }
    })

})

app.delete("/hotels/:id/comments/:comment_id" , checkOwnership ,function(req,res){

    Comment.findByIdAndRemove(req.params.comment_id,function(err,removeComment){
        if(err){
            console.log(err)
        }else{
            req.flash("success","Succcessfully deleted comment")
            res.redirect("/hotels/"+req.params.id)
        }
    })


})





app.get("/team" , function(req,res){
    
    res.render("team")
})



app.get("/register" , function(req,res){
     
    res.render("register",{error:req.flash("error")})
})
app.post("/register",function(req,res){

	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message)
			return res.render("register")
		}else{
			passport.authenticate("local")(req,res,function(){
                
                req.flash("success","Welcome to HotelStore"+user.username)

				res.redirect("/")
			})
		}

	})

})



app.get("/login", function(req,res){
    
    req.flash("error","You need to be LoggedIn to that Sir")
	res.render("login" , {error:req.flash("error")}); 
})

app.post("/login"  , passport.authenticate("local" , {
    
	successRedirect:"/",
	failureRedirect:"/login"

})  , function(req,res){

})




function isLoggedIn(req,res,next){

	if(req.isAuthenticated()){
		return next()
	}
        req.flash("error","You need to be LoggedIn")
		res.redirect("/login");
}

function checkOwnership(req,res,next){
    
	if(req.isAuthenticated())
	{
		Comment.findById(req.params.comment_id , function(err,foundComment){
			if(err){
                req.flash("error","Campground not found")
				res.redirect("back")
			}else{
				
				if( foundComment.author.id.equals(req.user._id)){
					next()
				}else{
                    req.flash("error","You do not have permission to do that")
					res.redirect("/back")
				}
			}
		})

	
	}else{

	req.flash("error","You need to be LoggedIn to do that")	
	res.send("need login In")

	}	

}


app.get("/logout",function(req,res){
    req.logout();
    req.flash("success" , "You Logged Out successfully Sir");
	res.redirect("/");
})











app.listen("3000" , function(req,res){
    console.log("Banaras is running!!")
})