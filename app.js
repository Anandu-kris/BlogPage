const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

//express app
const app = express();

//MongoDb connection
const dbURI = 'mongodb+srv://Niraj:root1415@cluster0.2vabmg7.mongodb.net/Nodedb?retryWrites=true&w=majority'
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


//register view engine
app.set('view engine', 'ejs');


//static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
//3rd party middleware
app.use(morgan('dev'));

//routes
app.get('/',(req, res)=>{
  res.redirect('/blogs');
});

app.get('/about',(req, res)=>{
  res.render('about',{title: 'About'});
});

//blog routes
app.use('/blogs',blogRoutes);

//404 pages
app.use((req,res)=>{
  res.status(404).render('404',{title: '404'});
});
