const express = require('express');
const userRouter = require('./routes/user');

const app = express();
const SERVER_PORT = process.env.PORT || 3000

// Build in Routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application level middleware
app.use((req, res, next) => {
    console.log(`${"Application Level Middleware: "}${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
})

// Custom Routes
const router = express.Router();
app.use('/', router)

// Add User Router
app.use('/api/v1/user', userRouter);

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/

// http://localhost:3000/home.html
router.get('/home.html', (req,res) => {
  res.sendFile(__dirname + "/home.html");
});

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/

// http://localhost:3000/error
app.get('/error', (req,res) => {
  throw new Error('This is a forced error.');
});

// Error Handling Middleware
app.use((err,req,res,next) => {
  console.log('Application Level Error Handling Middleware:', err.message);
  res.status(500).send('Server Error');
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`)
});