const express=require('express');
const morgan= require('morgan');
const cors= require('cors');
const {mongoose}=require('./database');
const path =require('path');
const multer= require('multer');
const uuid= require('uuid/v4');

const app= express();




  

//settings
app.set('port',process.env.port||3000);


//middeleares
app.use(morgan('dev')); 
app.use(express.json());
app.use(cors({origin:'http://localhost:4200'}));


//Routes
app.use('/api/service',require('./routes/service.route'));

//static files

app.use(express.static(path.join(__dirname, 'libs/public')));
//starting server
app.listen(app.get('port'),()=>{
console.log('server on port', app.get('port'));
});