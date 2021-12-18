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
const keys = require('./keys')

//routes
const dictionaryRoutes = require('./routes/dictionary');
const photoalbumRoutes = require('./routes/photoalbum');
const meritsRoutes = require('./routes/merits');
const aboutRoutes = require('./routes/about');
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');
const toParentsRoutes = require('./routes/toParents');
const portfolioRoutes = require('./routes/portfolio');
const olimpsRoutes = require('./routes/olimps');
const fizminRoutes = require('./routes/fizmin');
const workProgramRoutes = require('./routes/workProgram');
const underperformingRoutes = require('./routes/underperforming');
const lessonsRoutes = require('./routes/lessons');
const extracurricularRoutes = require('./routes/extracurricular');

const app = express();
//6wBTWeWDZTWbXE9
const store = MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI,
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded());//исправление ошибки: req.body пустой
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(express.static(__dirname +'/public/'));
app.use(session({
    secret: keys.SESSION_SECRET,
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
app.use('/toParents', toParentsRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/olimps', olimpsRoutes);
app.use('/fizmin', fizminRoutes);
app.use('/workProgram', workProgramRoutes);
app.use('/underperforming', underperformingRoutes);
app.use('/lessons', lessonsRoutes);
app.use('/extracurricular', extracurricularRoutes);

async function start(){
    try {
        //const password = "6wBTWeWDZTWbXE9";

        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true
        });

        app.set('port', (process.env.PORT || 3000));
        app.listen(app.get('port'), () => console.log('Server is running'));
    } catch (e){
        console.log(e);
    }
}

start();

