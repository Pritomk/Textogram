const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const {MONGOURI} = require('./config/keys');
const cors = require('cors');


app.use(cors())

//Connect server with mongodb database
mongoose.connect(MONGOURI);

mongoose.connection.on('connected', ()=> {
    console.log("Database has been connected");
})

mongoose.connection.on('error', (err)=> {
    console.log(`Error with ${err}`);
})

require('./models/User');
require('./models/Post');


app.use(express.json())


const customMiddleware = (req, res, next) => {
    console.log("This is the middleware");
    next();
}

//Use middleware into entire server
// app.use(customMiddleware);
const requirelogin = require('./middleware/requirelogin');
app.get('/protected',requirelogin,(req, res) => {
    res.send("Hello world");
});




app.use('/auth/',require('./routes/auth'));
app.use('/post/',require('./routes/post'));
app.use('/profile/',require('./routes/user'));

app.listen(PORT,() => {
    console.log(`Server is running on Port no http://localhost:${PORT}`);
});