require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const router = require('./routes/index');

const app = express();
app.use(logger('dev'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'Welcome to my API'
    });
});
app.get('/api/docs', (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/29497408/2sA3QwbpRP');
});
app.use('/api', router);

app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || 'Internal server error';
    res.status(errStatus).json({
        status: false,
        message: errMessage
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});