
# Tech Blog

![Badge](https://img.shields.io/badge/license-MIT-blue)

## Table of Contents
---
* [License](#license)
* [Installation](#installation)
* [Packages](#packages)
* [Description](#description)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

<br>

## License 
---
[MIT License](./LICENSE) <br>

Copyright (c) 2023 Alicia Keberle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 <br>

<br>

## Installation
---
To install this project: 
1. Start by forking this repository on Github. 
2. Clone this project to your machine by using the "git clone + URL" command. 
3. Open the project with your favorite text editor, like VS Code (in your terminal, first type "cd foldername" then "code ."). 
4. Install Node.js from their website, if you have not already. Here are some additional [instructions](https://coding-boot-camp.github.io/full-stack/nodejs/how-to-install-nodejs).
5. Install MySQL from their website, if you have not already. Here are some additional [instructions](https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide).
6. Suggest installing [Nodemon](https://www.npmjs.com/package/nodemon) if you have not already.
7. Suggest installing [Insomnia](https://insomnia.rest/download) if you have not already. 
8. This project includes a package.json file that specifies dependencies for this project, so be sure to run "npm install". This will install the packages specified in the next section. 

<br>

## Packages
---
General Technologies: 
- ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
- ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
- ![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white) 


NPM Packages
- nodemon 
- bcrypt
- dotenv
- ![express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

- ![mysql2](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
- ![sequelize](https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue)
     - connect-session-sequelize

- ![express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
    - express-handlebars
    - express-session

<br>

## Description
---
This project is a blog site specifically designed for developers. The main objective behind this project was to create a platform where tech enthusiasts can freely share their thoughts, opinions, articles, and blog posts.

When you visit the site, you will be greeted by the homepage displaying existing blog posts, along with a convenient navigation bar to help you explore different sections of the site. If you attempt to navigate away from the homepage, you will automatically be redirected to the login page.

On the login page, you have the option to either log in with your existing account or sign up for a new account. Upon signing up, you will be automatically logged in and redirected to your personal dashboard. The dashboard serves as your landing platform, providing an overview of your own posts and activities.

Within your dashboard, you have the ability to interact with your posts. You can choose to update or delete any of your existing posts, giving you full control over your content. Additionally, if you come across a post on the homepage that belongs to someone else, you can view the associated comments and even leave a comment of your own.

To ensure a seamless and secure user experience, this project utilizes technologies such as MySQL for database management, Sequelize as an ORM (Object-Relational Mapping) tool, and sessions for storing your login information. Your login session will remain active for 30 minutes, allowing you to freely explore the site and engage with the community.

Overall, this blog site aims to create a dynamic and engaging platform for developers to connect, share knowledge, and express their ideas in a supportive environment.
 <br><br>
To view this project deployed, click [here](). <br><br>

## Usage 
---
After following the instructions in installation: 
1. Open the database file in your terminal. 
2. Run command "mysql -uroot -p" and enter your password (note: keystrokes will not show).
3. Run command "SOURCE schema.sql" to set up the database and tables.
4. Optionally, run command "npm run resetdb" to replace steps 2 and 3 (enter password when prompted).
5. OK to 'quit' MySql.
6. Create a file called ".env" in the root folder of the program. In this folder include the following information: <br>
DB_NAME='' <br>
DB_USER='' <br>
DB_PASSWORD='' <br>
SECRET=''<br>
7. Open the "server.js" file in your integrated terminal. 
8. Run command "npm run seed" (or "node seeds/index.js") to seed the database if desired.
9. Run command "npm run start" (or "node server.js"). Alternatively, if you have Nodemon installed, run "npm run watch" (or "nodemon server.js"). 
10. Open 'localhost:3001' in your browser and see the site in action.
11. Enter login/logout/signup requests as you please, create a new blog post or update/delete an existing one, or add comments to blog posts. 
12. When finished, run CONTROL-C in terminal to end stop nodemon, and trash the session. 
<br>

### **Screenshots**
--- 
Login and create a post <br>

<br>
Update/Delete your post, or comment on someone else's <br>

<br>

## Contributing 
---
This project was completed by myself, Alicia Keberle, with the instruction of the University of Oregon Full Stack Development Bootcamp. If you would like to contribute, please do and let me know if you have any questions.

Areas needing contribution:
- Add a profile picture to the user dashboard
- Correcting post route to add comment
- Add a delete comment route
- Correcting post route to add post
- Correcting delete route to delete post

<br>

## Questions?
---
Please contact me on Github at [keberlea](https://github.com/keberlea) or by [email](mailto:alicia.keberle@gmail.com).