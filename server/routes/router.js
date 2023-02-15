const express = require('express');
const route = express.Router()
const services = require('../services/render');
const controller = require('../controller/controller');
const Userdb = require('../model/model');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/',services.homeRoutes);

/**
 *  @description student
 *  @method GET /student
 */
route.get('/student', services.student);

/**
 *  @description teacher
 *  @method GET /teacher
 */
route.get('/teacher', services.teacher);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user',services.add_user);

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user/:id',services.update_user);

/**
 *  @description for view result
 *  @method GET /view-result
 */
route.get('/view-result/:id',services.view_result);

route.post("/searchResult", (req,res)=>
{
    const name = req.body.name;
    const rollnumber = req.body.rollnumber;
    Userdb.findOne({name:name, rollNo:rollnumber},(err,result)=>{
        if(err)
        {
            res.json({message:"No Data Found"});
        }else
        {
            res.render("searchResultData",
            {result: result})
        }
    });
})

// API
route.post('/teacher/api/users', controller.create);
route.get('/api/users', controller.find);
route.post('/api/users/:id', controller.update);
route.get('/delete/api/users/:id', controller.delete);

module.exports = route;