const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Jm241410',
    database: 'vacantes_react',
});

app.use(express.json());
app.use(cors());
app.listen(3001, () => {
    console.log('listening on 3001')
})

//empresa
app.post('/company',(req,res)=>{
    const company = req.body.company
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const logo = req.body.logo
    db.query(`INSERT INTO company (company,username,email,password,logo) VALUES(?,?,?,md5(?),?)`,[company,username,email,password,logo],
    (err, result) => {
        if (err) {
            res.send({
                status: 400,
                message: err
            })
        }else{
            res.status(201)
            .send({
                status: 201,
                message: 'Empresa creada con éxito',
                data: result
            })
        }
    }
    );
})

//login
app.post('/login',(req,res)=>{
    const email = req.body.email
    const password = req.body.password
    //
    db.query(`SELECT company,username,email,logo FROM company WHERE email=? AND password=?`,[email,password],
    (err, result) => {
        if (err) {
            res.send({
                status: 500,
                message: err
            })
        }else{
            if (result.lenght > 0){
                res.status(200)
                .send(result[0])
            }
            else{
                res.status(401).send({
                    status: 401,
                    message: 'Usuario o contraseña incorrectos'
                })
            }
        }
    }
    );
})