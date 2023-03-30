const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
const client = require('./src/app/utils/redis');
const route = require('./src/routes');
//const db = require('./src/app/utils/connect');
//route init
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors({origin:true}));
route(app);
async function start(){
    await client.connect();
}
start();
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))