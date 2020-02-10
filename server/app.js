require('dotenv').config()
const userRoute = require('./routes/user');
const comicRoute = require('./routes/comic');

const errorHandling = require('./middlewares/errorHandling');
const authentication = require('./middlewares/authentication');

const express   = require('express')
const cors      = require('cors');

const app       = express()
const port      = process.env.PORT;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());



app.use('/', userRoute);
app.use(authentication);
app.use('/comics', comicRoute);

app.use(errorHandling);


app.listen(port, () => console.log(`App listening on port ${port}!`))