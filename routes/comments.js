var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
	Comment    = require("../models/comment"),
	middleware = require("../middleware");

// 	NEW Comments Route - Show the form to add a new comment
router.get("/new", middleware.isLoggedIn, function(req, res){
	// Find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render("comments/new", {campground: campground});
		}
	});
});

// CREATE Comments Route
router.post("/", middleware.isLoggedIn, function(req, res){
	// Look up campground using id
	Campground.findById(req.params.id, function(err, campground){
		if(err)
		{
			console.log(err);
			res.redirect("/campgrounds");
		}
		else
		{
			Comment.create(req.body.comment, function(err, comment){
				if(err)
				{
					req.flash("error", "Something went wrong");
					console.log(err);
				}
				else
				{
					// add username and id comment
					comment.author.id = req.user.id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					var url= "/campgrounds/" + campground._id ;
					req.flash("success", "Successfully added a comment");
					res.redirect(url);
				}
			});
		}
	})
});

// Comments EDIT Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership,function(req, res)
{
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err)
		{
			res.redirect("back");
		}
		else
		{
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	});
});

// Comments UPDATE Route
router.put("/:comment_id", function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err)
		{
			res.redirect("back");
		}
		else
		{
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});

// Comments DESTROY Route
router.delete("/:comment_id", middleware.checkCommentOwnership,function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err)
		{
			res.redirect("back");
		}
		else
		{
			Comment.findByIdAndRemove(req.params.comment_id, function(err){
				if(err)
				{
					res.redirect("back");
				}
				else
				{
					req.flash("success", "Comment deleted");
					res.redirect("/campgrounds/" + req.params.id);
				}
			});
		}
	});
});

module.exports = router;