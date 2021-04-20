const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
require('./database');

app.use(bodyParser.json());
app.use(cors());

const users = require('./api/createUser');
const login = require('./api/loginUser')
const addSubscriber = require('./api/addSubscriber')
const listSubscriber = require('./api/listSubscriber')
const createContent = require('./api/createContent')
const getContent = require('./api/getContent')
app.use('/api/create', users);
app.use('/api/login',login);
app.use('/api/add',addSubscriber)
app.use('/api/list',listSubscriber)
app.use('/api/createContent',createContent)
app.use('/api/getContent',getContent)

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});