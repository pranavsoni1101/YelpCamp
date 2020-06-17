var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");  
    data       = [
        {
            name: "Cloud's Rest",
            image: "https://images.unsplash.com/photo-1505232070786-2f46d15f9f5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: " Hola Hola Hola"
        },
        {
            name: "Desert Mesa",
            image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Augue interdum velit euismod in pellentesque massa. Ornare suspendisse sed nisi lacus sed viverra tellus. Elit duis tristique sollicitudin nibh sit. Quis auctor elit sed vulputate mi. Fames ac turpis egestas integer eget aliquet nibh. Euismod in pellentesque massa placerat duis ultricies lacus. Pretium lectus quam id leo in. Sed viverra tellus in hac habitasse platea dictumst vestibulum. Purus faucibus ornare suspendisse sed nisi lacus sed viverra. Tristique senectus et netus et malesuada fames ac turpis egestas.Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Nunc mattis enim ut tellus elementum sagittis vitae. Lectus quam id leo in vitae turpis massa sed. Sed elementum tempus egestas sed sed risus. Malesuada fames ac turpis egestas sed tempus. Lobortis mattis aliquam faucibus purus in massa tempor. Dolor morbi non arcu risus quis varius quam. Id leo in vitae turpis. Cursus in hac habitasse platea dictumst quisque. Elementum curabitur vitae nunc sed. Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing. Egestas diam in arcu cursus euismod quis viverra nibh. Rhoncus aenean vel elit scelerisque mauris.Egestas tellus rutrum tellus pellentesque eu tincidunt. Cursus sit amet dictum sit amet justo donec enim. Eu consequat ac felis donec et odio pellentesque diam volutpat. Congue eu consequat ac felis donec et odio. Diam quam nulla porttitor massa id neque aliquam vestibulum. Nec feugiat nisl pretium fusce id velit ut tortor pretium. Vitae congue eu consequat ac felis donec. In tellus integer feugiat scelerisque varius morbi enim nunc. Diam phasellus vestibulum lorem sed. Volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Faucibus in ornare quam viverra. Tellus orci ac auctor augue mauris augue. Egestas quis ipsum suspendisse ultrices gravida dictum fusce ut."
        },
        {
            name: "Canyon Floor",
            image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: " Hola Hola Hola"
        },
        {
            name: "God's Country",
            image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
            description: " Hola Hola Hola"
        }
    ];

function seedDB()
{
    // Remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err)
        {
            console.log(err);
        }
        console.log("removed campgrounds");
            // Add campground
        data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log("added a campground");
                // Create a comment
                Comment.create(
                    {
                        text: "This place is great",
                        author: "Homie"
                    }, function(err, comment){
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            campground.comments.push(comment);
                            campground.save()
                            console.log("Created a new comment");
                        }
                    });
            }
        });
    });


});

}

module.exports = seedDB;