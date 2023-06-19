//require express, router, models
const router = require('express').Router();
const express = require('express');
const { User, Post, Comment } = require('../models');


router.get('/', async (req, res) => {
    // retrieve all blogs with associated users
    Blog.findAll({ include: [User]})
        .then(blogs => {
            //convert blogs to plain objects
            const hbsBlogs = blogs.map(blog=>blog.get({plain:true}))
            // check if user is logged in
            const loggedIn = req.session.user?true:false;
            // render homepage
            res.render('homepage', {blogs:hbsBlogs, loggedIn, username:req.session.user?.username})
        })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }
    );
});


router.get('/login', (req, res) => {
    // check if user is logged in
   if(req.session.user){
         // redirect to homepage if user is logged in
         res.redirect('/');
         return;
   }
    // render login page
    res.render('login', {loggedIn});
});


router.get('/dashboard', (req,res) => {
    // check if user is logged in
    if(!req.session.user){
        // redirect to login page if user is not logged in
        res.redirect('/login');
        return;
    }
    // retrieve all blogs with associated users
    Blog.findAll(req.session.user.id, {
         include: [Blog, Comment]
    })
    .then(userData => {
        // convert data to plain objects
        const hbsData = userData.get({plain:true})
        hbsData.loggedIn = req.session.user?true:false;
        // render dashboard
        res.render('dashboard', hbsData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
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