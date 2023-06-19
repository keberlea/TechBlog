//require connection
const sequelize = require('../config/connection');
//require models
const { User, Post, Comment} = require('../models');

//create seed data
const users = [
    {
        username: 'testuser1',
        password: 'password123'
    },
    {
        username: 'testuser2',
        password: 'password123'
    },
    {
        username: 'testuser3',
        password: 'password123'
    },
    {
        username: 'testuser4',
        password: 'password123'
    },
]

const posts = [
    {
        title: 'test post 1',
        content: 'test content 1',
        user_id: 1
    },
    {
        title: 'test post 2',
        content: 'test content 2',
        user_id: 2
    },
    {
        title: 'test post 3',
        content: 'test content 3',
        user_id: 3
    },
    {
        title: 'test post 4',
        content: 'test content 4',
        user_id: 4
    },
]

const comments = [
    {
        comment_text: 'test comment 1',
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: 'test comment 2',
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: 'test comment 3',
        user_id: 3,
        post_id: 3
    },
    {
        comment_text: 'test comment 4',
        user_id: 4,
        post_id: 4
    },
]

//create function to seed data
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const createdUsers = await User.bulkCreate(users, {
        individualHooks: true,
        returning: true,
    });

    const createdPosts = await Post.bulkCreate(posts);

    const createdComments = await Comment.bulkCreate(comments);

    process.exit(0);
}

seedDatabase();
