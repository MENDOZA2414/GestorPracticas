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