// BRING IN EXPRESS
//const members = require('./Members'); 
const express = require('express');
const path = require('path');
const members = require('./Members');
const logger = require('./middleware/Middleware');
const exphbs = require('express-handlebars');

//

const app =  express();

// HANDLEBARS MIDDLEWARE
app.engine('handlebars',exphbs({defaultLayout:'main'}));

// SETTING  VIEW ENGINE
app.set('view engine','handlebars');

// BODY PARSER MIDDLEWARE
app.use(express.json());

// FOR FORMS and to also handle URLENCODED DATA
app.use(express.urlencoded({extended:false}));

// HOMEPAGE TEMPLATE ROUTE
app.get('/',(req,res) => res.render('index',{title:'Hello there',members}));

// when they send a request to /  my callback is what action i want to do

    // just send some simple html tag to browser
    //res.send('<h1> Hello There !!</h1>');

    // want to load a html file instead
    // specify path to the file to be sent
    //res.sendFile(path.join(__dirname,'public','index.html'));
    
    // SETTING A FOLDER TO BE A STATIC SERVER
    // will serve any html css image file dynamically 
    // without writing multiple routes
    app.use(express.static(path.join(__dirname, 'public')));

    // INITIALIZE THE MIDDLEWARE
    //app.use(logger);

    app.use('/api/members', require('./routes/api/members'));



    // set port (check for the one provided in environmental variables during deployment)
    // or use 5000 this will be used inn development as well as we have not yet deployed
const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=> console.log(`Server started at port${PORT}`));