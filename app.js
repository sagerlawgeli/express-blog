const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();

// connect to MongoDB
const dbURI = 'mongodb+srv://Sager:Lozinkazamongodb1!@cluster0.hq5bp.mongodb.net/node-tuts?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// index or home route
app.get('/', (req, res) =>{
    res.redirect('/blogs');
});

// about route 
app.get('/about', (req, res) =>{
    res.render('about', { title: 'About' });
});

// Blog route
app.use('/blogs',blogRoutes)

// 404 route
app.use((req, res)=>{
    res.status(404).render('404', { title: '404' });
})