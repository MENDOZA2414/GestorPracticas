const express = require('express');
const app = express();
const cors = require('cors');
const { get } = require('http');

app.use(cors());
app.listen(3001, () => {
    console.log('listening on 3001')
})

app.get('/', (req,res) => {
    res.send({status: 200});
})
