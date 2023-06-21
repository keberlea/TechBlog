const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../../models');
const bcrypt = require('bcrypt');

router.get('/', (req,res) => {
    User.findAll({
        include:[Post, Comment]
    })
    .then(dbUsers => {
        res.json(dbUsers)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg:'an error occured',err});
    });
});

router.get('/:id', (req,res) => {
    User.findByPk(req.params.id, {include: [Post, Comment]
    })
    .then(dbUser => {
        res.json(dbUser);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg:'an error occured',err});
    });
});

//signup api/users
router.post('/', (req,res) => {
    User.create(req.body, {individualHooks: true})
    .then(newUser => {
        req.session.user = {
            id: newUser.id,
            username: newUser.username
        }
        res.json(newUser);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg:'an error occured',err});
    });
});

//login api/users/login
router.post('/login', (req,res) => {
    //find username that matches req
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(foundUser => {
        if(!foundUser){
            res.status(400).json({msg:'user not found'});
            return;
        }
        // compare password
      const isPasswordValid = bcrypt.compareSync(req.body.password, foundUser.password);
      if (!isPasswordValid) {
        res.status(400).json({ msg: 'Incorrect password' });
        return;
      }
      req.session.user = {
        id: foundUser.id,
        username: foundUser.username
      };
      // Redirect the user to the dashboard
      res.redirect('/dashboard');
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: 'An error occurred', err });
    });
});

//logout api/users/logout
router.post('/logout', (req,res) => {
    if(req.session.user){
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//update api/users/:id
router.put('/:id', (req,res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(updatedUser => {
        res.json(updatedUser);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg:'an error occured',err});
    });
});

//delete api/users/:id
router.delete('/:id', (req,res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(deletedUser => {
        res.json(deletedUser);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({msg:'an error occured',err});
    });
});

module.exports = router;
