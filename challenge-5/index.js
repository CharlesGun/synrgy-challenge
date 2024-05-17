require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const router = require('./routes/index');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
app.use(logger('dev'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(router);

app.get('/', async (req, res) => {
    return res.render('login');
});

// 404 handler
app.use(function (req, res, next) {
    return res.render('not-found');
})

//500 handler
app.use(function (err, req, res, next) {
    return res.render('server-error', {
        error: err.message
    });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});