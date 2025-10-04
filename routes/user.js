const express = require('express');
const fs = require('fs');
const path = require('path');

const userRouter = express.Router();

// Route Level Middleware (user level)
userRouter.use((req, res, next) => {
    console.log("User Route Middleware");
    next();
})

// http://localhost:3000/api/v1/user/profile
userRouter.get('/profile', (req, res) => {
    const filePath = path.join(__dirname, '../user.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading user.json:', err);
      return res.status(500).json({ error: 'Failed to read user data' });
    }

    const user = JSON.parse(data);
    res.json(user);
  });
});

// http://localhost:3000/api/v1/user/login
userRouter.post('/login', (req,res) => {
    const { username, password } = req.body;

    const filePath = path.join(__dirname, '../user.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading user.json:', err);
            return res.status(500).json({ error: 'Failed to read user data' });
        }

        const user = JSON.parse(data);

        if (user.username !== username) {
            return res.json({
            status: false,
            message: 'User Name is invalid'
            });
        }

        if (user.password !== password) {
            return res.json({
            status: false,
            message: 'Password is invalid'
            });
        }

        res.json({
            status: true,
            message: 'User Is valid'
        });
  });
});

// http://localhost:3000/api/v1/user/logout/bret
userRouter.get('/logout/:username', (req, res) => {
    const { username } = req.params; // get username from route parameter

    if (!username) {
        return res.status(400).send('<b>Username is required to log out.</b>');
    }

    res.send(`<b>${username} successfully logged out.</b>`);
});

// http://localhost:3000/api/v1/user/error
userRouter.get('/error', (req,res) => {
  throw new Error('This is a forced error in User Router.');
});

// Error Handling Middleware
userRouter.use((err,req,res,next) => {
  console.log('User Route Level Error Handling Middleware:', err.message);
  res.status(500).send('User Server Error');
});

module.exports = userRouter;