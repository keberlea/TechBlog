//require express, express handlebars, controllers, express-session, connection, connect session sequilize session.store and dotenv
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();


//start app and define port
const app = express();
const PORT = process.env.PORT || 3001;

//require User, Post and Comment models
const { User, Post, Comment } = require('./models');


//utilize app
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//set up session
const sess = {
    secret: process.env.SECRET,
    cookie: {
        //session will expire in 30 minutes
        expires: 30 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
//initialize the sessions middleware for use with Express
app.use(session(sess));
app.use(express.static('./public'));

//set up handlebars
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//routes to be used by server
app.use("/", routes);

//sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});

