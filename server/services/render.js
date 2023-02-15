const Userdb = require("../model/model");
const axios = require('axios');
const dayjs = require('dayjs');

exports.homeRoutes =(req,res)=>{
    res.render('index');
}

exports.add_user =(req,res)=>{
    res.render('add_user');
}

exports.update_user =(req,res)=>{
    Userdb.findById(req.params.id,(err,result)=>{
        if(err){
            res.send("Some error occured");
        }else{
            let date = dayjs(result.birthDate);        
            let editResultModel = {
                _id: result._id,
                name: result.name,
                birthDate:date.format("YYYY-MM-DD"),
                score:result.score,
                rollNo:result.rollNo
            }
            if(result === null || result === undefined)
            {
                res.redirect('/index');
            }else{
                res.render('update_user',{result:editResultModel})
            }
        }
    });
}

exports.teacher =(req,res)=>{
    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        res.render('teacher',{users: response.data});
    })
    .catch(err =>{
        res.send(err);
    })
}

// retrieve and return all users/ retrive and return a single user
exports.student = (req, res)=>{
    if(req.query.id)
    {
        const id = req.query.id;
        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })
    }
    else{
        Userdb.find().exec((err,data)=>{
            if(err)
            {
                res.send("Some error occured");
            }else{
                res.render("student",{results:data});
            }}) 
    }
}

exports.view_result =(req,res)=>{
    Userdb.findById(req.params.id,(err,result)=>{
        if(err){
            res.send("Some error occured");
        }else{
            let date = dayjs(result.birthDate);        
            let editResultModel = {
                _id: result._id,
                name: result.name,
                birthDate:date.format("YYYY-MM-DD"),
                score:result.score,
                rollNo:result.rollNo
            }
            if(result === null || result === undefined)
            {
                res.redirect('/index');
            }else{
                res.render('view-result',{result:editResultModel})
            }
        }
    });
}