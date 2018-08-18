const expressfunction=require('express');
const hbs=require('hbs');
const fs= require('fs');
var app= expressfunction();
var port = process.env.PORT||3000; //env is an object that stores environment variable as key value pairs
//if port not found then it will take 3000 by default
app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');//to include other jsp inside one jsp
app.use(expressfunction.static(__dirname + '/public'));//dirname is the variable gets passed into our file by that wrapper function
//currently dirname stores the path as Node_WebServer
app.use((req, res, next) =>{
  var now= new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) =>{
    if(err){
      console.log('unable to append file');
    }
  });
  next();//this function will hit only when any url request is sent
});

// app.use((req, res, next) =>{
//     res.render('maintenance.hbs');//it will not allow other page to display
// });
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/',(request, response) =>{
  response.render('home.hbs',{
    pageTitle:'Home Page html',
    WelcomeMessage:'Welcome to Home Page'
  })
});

// app.get('/about',(request, response) =>{
//   response.send({
//   name:'Venki',
// Likes:['cycle','sports']});
// });

app.get('/about',(request, response) =>{
  //response.render('about.hbs');//to send value to html
  response.render('about.hbs',{
    pageTitle:'About Page html'
  })
});

app.get('/projects',(request, response) =>{
  //response.render('about.hbs');//to send value to html
  response.render('project.hbs',{
    pageTitle:'Project Page html'
  })
});


app.get('/bad',(request, response) =>{
  response.send({
  errorMessage:'Unable to handle request'});
});

app.listen(port,()=>{
  console.log(`server is up and running on port : ${port}`);
});
//app.listen is used to bind our data to our port on our machine
