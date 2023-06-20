const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');

//get all posts and blogs associated with users/comments
router.get('/', (req,res) => {
    Comment.findAll({
        include: [User, Post]
    })
    .then(dbComments => {
        res.json(dbComments);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg:'an error occured',err});
    });
});

//get one post and associated user and comment
router.get('/:id', (req,res) => {
    Comment.findByPk(req.params.id, {
        include: [User, Post]
    })
    .then(dbComment => {
        res.json(dbComment);
    })
    .catch(err => { 
        console.log(err);
        res.status(500).json({msg:'an error occured',err});
    });
});

//create new post comment
router.post('/', (req,res) => {
    //check for logged in user
    //if no user in session, send message
    if(!req.session.user_id){
        res.status(403).json({msg:'You must be logged in to create a comment'});
        return;
    }
    //create comment user id from session
    Comment.create({
        body: req.body.body,
        userId: req.session.user.id,
        postId: req.body.postId
    })
    .then( newComment => {
        res.json(newComment);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg:'an error occured',err});
    });
});

router.put("/:id", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg:"Please login first!"})
    }
      // TODO: Ensure user updating is original author
    Comment.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(updatedComment => {
      res.json(updatedComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

router.delete("/:id", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg:"Please login first!"})
    }
      // TODO: Ensure user deleting is original author
    Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(delComment => {
      res.json(delComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});







module.exports = router;