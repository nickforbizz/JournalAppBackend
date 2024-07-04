module.exports = app => {
    const test = require("../controllers/TestController");
  
    var router = require("express").Router();
  

  
    // Retrieve all test data
    router.get("/", test.fetchData);
  
  
  
    app.use('/api/test', router);
  };