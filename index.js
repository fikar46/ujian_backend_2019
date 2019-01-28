const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var fs = require('fs');

var port = 1997;

var app = express({defaultErrorHandler:false});

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))
const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'fikar123',
    database:'moviebertasbih',
    port: 3306
});


app.get('/', (req,res) => {
    res.send('<h1>Ini Homepage</h1>')   
    
})

//backend table movies dimulai
//read data movies list
app.get('/movies-list' , (req,res) => {
    var sql = 'select * from movies;'
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
//edit data movies list
app.post('/movies-edit/:id',(req,res)=>{
    var editMovies = req.body
    var sql = `update movies set ? where id=${req.params.id}`;
    conn.query(sql, editMovies,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
//delete data movies dan connection

app.post('/movies-delete/:id',(req,res)=>{
    var sql = `delete from movies where id=${req.params.id}`;
    conn.query(sql,(err,result)=>{
        res.send(result)
    })
    var sql2 = `delete from movcat where idmovie=${req.params.id}`;
    conn.query(sql2,(err,results)=>{
        console.log(results)
    })
})

//create data movies
app.post('/movies-add',(req,res)=>{
    var addMovies = req.body
    var sql = `insert into movies set ?`;
    conn.query(sql, addMovies,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//akhir backend table movies




//managecategories dimulai
//add category
app.post('/category-add',(req,res)=>{
    var addCategories = req.body
    var sql = `insert into categories set ?`;
    conn.query(sql, addCategories,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//edit categories
app.post('/category-edit/:id',(req,res)=>{
    var editCategory = req.body
    var sql = `update categories set ? where id=${req.params.id}`;
    conn.query(sql, editCategory,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
//read data categories
app.get('/category-list' , (req,res) => {
    var sql = 'select * from categories;'
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//delete data categories
app.post('/category-delete/:id',(req,res)=>{
    var sql = `delete from categories where id=${req.params.id}`;
    conn.query(sql,(err,result)=>{
        res.send(result)
        console.log(result)
    })
    var sql2 = `delete from movcat where idcategory=${req.params.id}`;
    conn.query(sql2,(err,results)=>{
        console.log(results)
    })
})
//akhir backend table categories



//movcat backend dimulai
//create data movcat
app.post('/movcat-add',(req,res)=>{
    var addMovcat = req.body
    var sql = `insert into movcat set ?`;
    conn.query(sql, addMovcat,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
//read data movcat
app.get('/movcat-list' , (req,res) => {
    var sql = 'select * from movcat;'
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
//update / edit data movcat
app.post('/movcat-edit/:id',(req,res)=>{
    var editMovcat = req.body
    var sql = `update movcat set ? where idmovie=${req.params.id}`;
    conn.query(sql, editMovcat,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//delete movcat
app.post('/movcat-delete/:id',(req,res)=>{
    var sql = `delete from movcat where idmovie=${req.params.id}`;
    conn.query(sql,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
app.get('/movcat-select' , (req,res) => {
    var sql = `select 
    mv.nama as nama_film, 
    ctr.nama as nama_category
    from movcat mc join movies mv on mc.idmovie = mv.id 
    join categories ctr on mc.idcategory = ctr.id`
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

app.listen(port, () => console.log('API Aktif di port ' + port))
