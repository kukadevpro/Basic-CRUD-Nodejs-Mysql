const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;

// connecting database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restful_api'
});
connection.connect((err)=>{
    if (err) throw err;
    console.log("Mysql Connected with App...!");
});

app.post('/api/post', (req,res)=>{
    const {fname,lname,email} = req.body;
    connection.query("INSERT INTO users(fname,lname,email) VALUES(?,?,?)",[fname,lname,email],(err,result)=>{
        if (err) {
            return res.json({status: "400",message: "Insert data is error"});
        }else{
            return res.json({status: "OK",message: "Insert data to database is success!"});
        }
    });
});

app.get('/api/get',(req,res)=>{
    connection.query("SELECT * FROM users",(err,result)=>{
        if (err) {
            return res.json({status: "400",message: "Get all data is error"});
        }else{
            return res.json({status: "OK",message: "Get all data from database is success!"});
            // return res.send(result);
        }
    });
});

app.get('/api/get/:id',(req,res)=>{
    const id = req.params.id;
    connection.query("SELECT * FROM users WHERE id = ?",[id],(err,result)=>{
        if (err) {
            return res.json({status: "400",message: "Get user by id is error"});
        }else{
            return res.json({status: "OK",message: "Get user by id from database is success!"});
            // return res.send(result); //use for show detial of user
        }
    });
});

app.put('/api/put/:id',(req,res)=>{
    const id = req.params.id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    connection.query("UPDATE users SET fname = ? ,lname = ? , email = ? WHERE id = ?",[fname,lname,email,id],(err,result)=>{
        if (err) {
            return res.json({status: "400",message: "Update user by id is error"});
            // throw err;
        }else{
            return res.json({status: "OK",message: "Update user by id from database is success!"});
            // return res.send(result); //use for show detial of user
        };
    });
});

app.delete('/api/delete/:id',(req, res)=>{
    const id = req.params.id;
    connection.query("DELETE FROM users WHERE id = ?",[id],(err, result)=>{
        if (err) {
            return res.json({status: "400",message: "Delete user by id is error"});
            // throw err;
        }else{
            return res.json({status: "OK",message: "Delete user by id from database is success!"});
            // return res.send(result); //use for show detial of user
        };
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is starting on port:${PORT}`);
})