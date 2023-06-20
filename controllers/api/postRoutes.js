const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../util/auth.js');

//get all posts and blogs associated with users/comments
router.get('/', (req,res) => {
    Post.findAll({
        include: [User, Comment]
    })
    .then(dbPosts => {
        res.json(dbPosts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg:'an error occured',err});
    });
});

//get one post and associated user and comment
router.get('/:id', (req,res) => {
    Post.findByPk(req.params.id, {
        include: [User, Comment]
    })
    .then(dbPost => {
        res.json(dbPost);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg:'an error occured',err});
    });
});

//create new blog post
router.post('/', withAuth, (req,res) => {
    //check for logged in user
    //if no user in session, send message
    if(!req.session.user_id){
        res.status(403).json({msg:'You must be logged in to create a post'});
        return;
    }
    //create blog post with title and content input by user, user id from session
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    //date is "createdAt"
    .then(newPost => {
        res.json(newPost);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg:'an error occured',err});
    });
});

//update post
router.put('/:id', withAuth, (req,res) => {
    //check for logged in user
    //if no user in session, send message
    if(!req.session.user_id){
        res.status(403).json({msg:'You must be logged in to update a post'});
        return;
    }
    //update post with title and content input by user, user id from session
    Post.update( req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(updatedPost => {
        res.json(updatedPost);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg:'an error occured',err});
    });
});

//delete post
router.delete('/:id', withAuth, (req,res) => {
    //check for logged in user
    //if no user in session, send message
    if(!req.session.user_id){
        res.status(403).json({msg:'You must be logged in to delete a post'});
        return;
    }
    //delete post with title and content input by user, user id from session
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(deletedPost => {
        res.json(deletedPost);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg:'an error occured',err});
    });
});

module.exports = router;