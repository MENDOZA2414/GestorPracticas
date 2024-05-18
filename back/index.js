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

// empresa
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

// consultar empresa
app.get('/company/:id',(req,res)=>{
    const companyId = req.params.id
    db.query(`SELECT  company_id,company,username,email,logo FROM company WHERE company_id=${companyId}`,
    (err, result) => {
        if (result.length >0) {
            res.status(200)
            .send(result[0])
        }else{
            res.status(400).send({
                message: 'No existe la empresa'
            })
        }
    }
    );
})


// login
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

// vacantes
app.post('/job',(req,res)=>{
    const title = req.body.title
    const from_date = req.body.from_date
    const until_date = req.body.until_date
    const city = req.body.city
    const job_type = req.body.job_type
    const experience = req.body.experience
    const company_id = req.body.company_id

    db.query(`INSERT INTO company (title,from_date,until_date,city,job_type,experience,company_id) VALUES(?,?,?,?,?,?,?)`,[title,from_date,until_date,city,job_type,experience,company_id],
    (err, result) => {
        if (err) {
            res.atatus(500).send({
                message: err
            })
        }else{
            res.status(201)
            .send({
                status: 201,
                message: 'Vacante creada con éxito',
                data: result
            })
        }
    }
    );
})

// consultar vacante
app.get('/job/:id',(req,res)=>{
    const id = req.params.id
    db.query(`SELECT * FROM job WHERE job_id=${id}`,
    (err, result) => {
        if (result.length >0) {
            res.status(200)
            .send(result[0])
        }else{
            res.status(400).send({
                message: 'No existe la vacante'
            })
        }
    }
    );
})

// Actualizar vacante
app.put('/job/:id',(req,res)=>{
    const id = Number(req.params.id)
    const title = req.body.title
    const from_date = req.body.from_date
    const until_date = req.body.until_date
    const city = req.body.city
    const job_type = req.body.job_type
    const experience = req.body.experience
    const company_id = Number(req.body.company_id)
    let validado = true

    switch(id){
        case company_id :
        db.query(`UPDATE job SET title=?,from_date=?,until_date=?,city=?,job_type=?,experience=?,company_id=? WHERE job_id=? AND company_id=?`,[title,from_date,until_date,city,job_type,experience,id,company_id],
        (err, result) => {
            if (err) {
                res.atatus(400).send({
                    message: err
                })
            }else{
                res.status(200)
                .send({
                    message: 'Vacante actualizada con éxito',
                    data: result
                })
            }
        }
        );
        break;
    default :
        res.atatus(401).send({
            message: 'Empresa no autorizada'
        })
        break;
    }
})