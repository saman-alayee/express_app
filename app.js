var express = require('express');
var app = express();

app.get('/',(req,res) =>{
    res.send('home');
});

app.get('/api/courses',(req,res) => {
    res.send([1,2,3]);
});

app.get('/api/courses/:id',(req,res) => {
    res.send(req.query)
});

const port = process.env.PORT || 5000;
app.listen(port,() =>console.log('port:' + port));