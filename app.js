const { deserializeUser } = require("passport");

var express    	   = require("express"),
    app        	   = express(),
    bodyParser 	   = require("body-parser"),
	mongoose   	   = require("mongoose"),
	passport   	   = require("passport"),
	LocalStratergy = require("passport-local"),
	methodOverride = require("method-override"),
	flash		   = require("connect-flash"),
	Campground 	   = require("./models/campground"),
	Comment	       = require("./models/comment"),
	User 	       = require("./models/user"),
	seedDB	       = require("./seeds");

// Requiring Routes 
var	campgroundRoutes = require("./routes/campgrounds"),
	commentRoutes 	 = require("./routes/comments"),
	indexRoutes		 = require("./routes/index");
	


mongoose.connect("mongodb://localhost/yelp_camp",{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); // seed the database

// PASSPORT AUTH CONFIG
app.use(require("express-session")({
	secret: "Dua is the best and the cutest singer",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Provide the user details to all the templates
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(3000, function(){
	console.log("The YelpCamp Server");
});