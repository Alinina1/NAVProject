const express = require('express');
const mongoose = require('mongoose');//база данных mongo db
const helmet = require('helmet');
const compression = require('compression');
const app = express();

//routes
const dictionaryRoutes = require('./routes/dictionary');
const photoalbumRoutes = require('./routes/photoalbum');
const meritsRoutes = require('./routes/merits');
const aboutRoutes = require('./routes/about');
const homeRoutes = require('./routes/home');

app.set('view engine', 'ejs');

app.use(helmet());
app.use(compression());
app.use(express.static(__dirname +'/public/'));

app.use('/', homeRoutes);
app.use('/home', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/merits', meritsRoutes);
app.use('/photoalbum', photoalbumRoutes);
app.use('/dictionary', dictionaryRoutes);

async function start(){
    try {
        const password = "6wBTWeWDZTWbXE9";
        const url = "mongodb+srv://alinina:6wBTWeWDZTWbXE9@cluster0.qqzdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        await mongoose.connect(url, {useNewUrlParser: true});

        app.set('port', (process.env.PORT || 3000));
        app.listen(app.get('port'), () => console.log('Server is running'));
    } catch (e){
        console.log(e);
    }
}

start();

