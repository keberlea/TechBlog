const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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
router.get('/:id', (req, res) => {
  Comment.findByPk(req.params.id, {
    include: [User, Post]
  })
  .then(dbComment => {
    res.json(dbComment);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

//create new post comment
router.post('/', (req, res) => {
  if(!req.session.user){
    return res.status(401).json({msg:"Please login first!"})
}
  Comment.create({
    comment_text:req.body.body,
    userId:req.session.user_id,
    postId:req.body.postId
    
  },{
    include:[User,Post]
  }
)
    .then(newComment => {
      res.json(newComment);
      console.log(newComment)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

router.put("/:id", (req, res) => {
    if(!req.session.user_id){
        return res.status(401).json({msg:"Please login first!"})
    }
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
    if(!req.session.user_id){
        return res.status(401).json({msg:"Please login first!"})
    }
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