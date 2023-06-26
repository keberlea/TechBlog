const router = require('express').Router();
const {User, Post, Comment} = require("../../models/");
const bcrypt  = require("bcrypt");

router.get("/", (req, res) => {
    User.findAll({
      include:[Post, Comment]
    })
      .then(dbUsers => {
        res.json(dbUsers);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
  });

  // logout by hitting /api/users/logout
  router.get("/logout", (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to log out" });
      }
      res.clearCookie("session-id");
      res.redirect("/");
    });
  });

router.get("/:id", (req, res) => {
    User.findByPk(req.params.id,{include:[Post, Comment]})
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});

// sign up api/users/
router.post("/", (req, res) => {
  // run hooks to hash and salt password; create user
    User.create(req.body, {individualHooks: true} )
      .then(newUser => {
        // IMMEDIATE LOG IN = create new session for user with id and username (sessions set to 30 min)
        req.session.user = {
          id:newUser.id,
          username:newUser.username
        }
        res.json(newUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});

// login api/users/login
router.post("/login", (req, res) => {
  // find username name that matches request
    User.findOne({
      where:{
      username:req.body.username
    }
}).then(foundUser=>{
  // if username is not found, send message
      if(!foundUser){
        return res.status(400).json({msg:"wrong login credentials"})
      }
      // compare password with saved hash
      if(bcrypt.compareSync(req.body.password,foundUser.password)){
        // if pw matches, create session for user 
        req.session.user = {
          id:foundUser.id,
          username:foundUser.username
        }
        return res.json(foundUser)
        // redirect page??
      } else {
        return res.status(400).json({msg:"wrong login credentials"})
      }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
});
  
router.put("/:id", (req, res) => {
    User.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true
    }).then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
  
router.delete("/:id", (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    }).then(delUser => {
      res.json(delUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
  });

module.exports = router;