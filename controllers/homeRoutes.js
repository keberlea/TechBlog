//require express, router, models
const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');


router.get('/', async (req, res) => {
    // retrieve all blogs with associated users
    Post.findAll({ include: [User]})
        .then(posts => {
            //convert blogs to plain objects
            const hbsPosts = posts.map(post=>post.get({plain:true}))
            // check if user is logged in
            const loggedIn = req.session.user?true:false;
            // render homepage
            res.render('home', {posts:hbsPosts, loggedIn, username:req.session.user?.username})
        })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }
    );
});

router.get('/login', (req, res) => {
    // check if user is logged in
    const loggedIn = req.session.user ? true : false;
  
    // render login page
    res.render('login', { loggedIn: loggedIn });
  });

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/dashboard', (req, res) => {
    // check if user is logged in
    if (!req.session.user) {
      // redirect to login page if user is not logged in
      res.redirect('/login');
      return;
    }
    // retrieve all blogs with associated users
    User.findByPk(req.session.user.id, {
      include: [
        {
          model: Post,
          include: [Comment]
        }
      ]
    })
      .then(userData => {
        // convert data to plain objects
        const hbsData = userData.get({ plain: true });
        hbsData.loggedIn = req.session.user ? true : false;
        // render dashboard
        res.render('dashboard', hbsData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//single post handler
router.get('/post/:id', (req, res) => {
    //check to see is user is logged in
    if(!req.session.user){
        //redirect to login page if user is not logged in
        res.redirect('/login');
        return;
    }
    //retrieve single post with associated user and comments
    Blog.findByPk(
        req.params.id,
        {
            include: [
                User,
                {
                    model: Comment,
                    include: [User]
                }
            ]
        }).then((dbPost) =>{
            //convert data to plain objects
            const hbsPost = dbPost.get({plain:true})
            const loggedIn = req.session.user?true:false;
            if (dbPost.userId !=req.session.user.is){
                //if not your post -> render comment page over homepage
                return res.render('comment',{hbsPost, loggednIn, username:req.session.user?.username});
            }
            //if your post -> render update.delete page over dashboard
            res.render('updateDelete', {hbsPost, loggedIn, username:req.session.user?.username})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }
    );
}); 

router.get('*', (req,res) => {
    res.redirect('/')
});

module.exports = router;