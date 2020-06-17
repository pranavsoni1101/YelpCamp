const campground    = require("../models/campground");
const middlewareObj = require("../middleware");

var express    = require("express"), 
    router     = express.Router(),
	Campground = require("../models/campground"),
	middleware = require("../middleware");
	

// INDEX Route - To show all campgrounds
router.get("/", function(req, res){
	// Get all Campgrounds from db
	Campground.find({}, function(err, allCampgrounds){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	})
});

// CREATE Route - To add new compground to db 
router.post("/", middleware.isLoggedIn,function(req, res){
	// Get data from the form and add to the get route
    var name  		  = req.body.name,
		image 		  = req.body.image,
		price		  = req.body.price
		desc          = req.body.description,
		author		  = {
			id:			req.user._id,
			username:	req.user.username
		},
    	newCampground = {name: name, image: image, price: price, description: desc, author: author};
    
    // Create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
    	if(err)
    	{
    		console.log(err);
    	}
    	else
    	{
    		// Redirect to the get route
    		res.redirect("/campgrounds");
    	}
    });
});

// NEW Route - Show form to create a new campground 
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

// SHOW Route - Shows more info about one campground
router.get("/:id", function(req, res){
	// Find campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err)
		{
			console.log(err);
		}
		else
		{
			// Render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

// EDIT Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	// Is user logged in at all
	if(req.isAuthenticated())
	{
		Campground.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campground: foundCampground});
		});

	}
	else
	{
		res.send("You need to be logged in tpo do that");
	}
		// Otherwise redirect
	// If not redirect somewhere
});

// UPDATE Campground Route
router.put("/:id", middleware.checkCampgroundOwnership,function(req, res){
	// Find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err)
		{
			res.redirect("/campgrounds");
		}
		else
		{
			// redirect to show page
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY Campgrounds Route
router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err)
		{
			res.redirect("/campground");
		}
		else
		{
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;