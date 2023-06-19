//require express and router
const router = require('express').Router();
const express = require('express');

const userRoutes = require('./api/userRoutes');
router.use('/api/users', userRoutes)

const postRoutes = require('./api/postRoutes');
router.use('/api/posts', postRoutes)

const commentRoutes = require('./api/commentRoutes');
router.use('/api/comments', commentRoutes)

const homeRoutes= require('./homeRoutes');
router.use('/', homeRoutes)


router.get("/showsessions",(req,res)=>{
    res.json(req.session)
})


module.exports = router;