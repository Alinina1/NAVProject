const express = require('express');
const mongoose = require('mongoose');//база данных mongo db
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const User = require('./models/user')
const userMiddleware = require('./middleware/user')
const varMiddleware = require('./middleware/variables');
const bodyParser = require('body-parser');

//routes
const dictionaryRoutes = require('./routes/dictionary');
const photoalbumRoutes = require('./routes/photoalbum');
const meritsRoutes = require('./routes/merits');
const aboutRoutes = require('./routes/about');
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');

const MONGODB_URI = "mongodb+srv://alinina:6wBTWeWDZTWbXE9@cluster0.qqzdi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const app = express();

const store = MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI,
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(express.static(__dirname +'/public/'));
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(varMiddleware);
app.use(userMiddleware);


app.use('/', homeRoutes);
app.use('/home', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/merits', meritsRoutes);
app.use('/photoalbum', photoalbumRoutes);
app.use('/dictionary', dictionaryRoutes);
app.use('/auth', authRoutes);

async function start(){
    try {
        //const password = "6wBTWeWDZTWbXE9";

        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true
        });

        app.set('port', (process.env.PORT || 3000));
        app.listen(app.get('port'), () => console.log('Server is running'));
    } catch (e){
        console.log(e);
    }
}

start();

