const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


//create new blog post
router.post('/', async (req,res) => {
    try{
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user.id
        },
        {
            include: [User]
        });
        res.json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:'an error occurred', err});
    }
});

//update post
router.put('/:id', async (req,res) => {
    try{
        const updatedPost = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            },
            {
                include: [User]
            }
        );
        res.json(updatedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:'an error occured',err});
    }
});

//delete post
router.delete('/:id', async (req,res) => {
    try{
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id
            }
        },
        {
            include: [User]
        }
            );
        res.json(deletedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg:'an error occured',err});
    }
});

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


module.exports = router;