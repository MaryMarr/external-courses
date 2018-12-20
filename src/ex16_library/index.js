require('dotenv').config();

const { PORT, PUBLIC_PATH, INDEX_FILE } = process.env;

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const morgan = require('morgan');

const app = express();

const api = require('./routes');

app.use(express.static(`${__dirname}/${PUBLIC_PATH}`));//передаёт статические файлы из папки public
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/api', api);//если не нашёл файл в public

app.get('*', function (_, res) {
    res.sendFile(path.resolve(`${__dirname}/${PUBLIC_PATH}`, INDEX_FILE));
});// получает статические файлы из папки public 

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
