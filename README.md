# 101491383_COMP3123-exec05

#### Section B: Short Answer Questions

**6. Explain the Purpose of `express.Router()` in the Code Above.**

- Why is `express.Router()` used in Express.js applications, and how does it benefit the code structure?

- It creates a new modular router object and allows to handle routes, middleware and parameters. Instead of having all the routes in index.js, it allows to seperate them in different js files making the code more organized.  

**7. Error Handling in Express.js**

- How would you implement error handling in the Express routes to ensure that any issues (such as file not found or server errors) are appropriately handled? Provide an example.

- Normally route handlers throw errors or pass errors to next(), however with the error handling middleware which takes four parameters (err,req,res,next) with a proper route to the application level or route level, it catches them and returns an appropriate response. In this lab's example we used it for the user.js and so any error that occurs in the user endpoints will show a user level error.