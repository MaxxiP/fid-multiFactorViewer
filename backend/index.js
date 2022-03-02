const express = require("express");
const session = require("express-session");
const InitiateMongoServer = require("./config/db");

const service = require('./routes/service');

const graph = require('./routes/graph')


const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const { logger } = require('./functions/logger')
require('dotenv').config();



const httpsOptions = {
	key: fs.readFileSync(path.join(__dirname, '/ssl/node_backend.key')),
	cert: fs.readFileSync(path.join(__dirname, '/ssl/node_backend.crt')),
	requestCert: false, // Kann für Client Authentifizierung genutzt werden
	rejectUnauthorized: false, // so we can do own error handling
	ca: [
		fs.readFileSync(path.join(__dirname, 'server_cert.pem'))
	]
};

const corsOpts = {
	"Access-Control-Allow-Credentials": false,
	"Access-Control-Allow-Origin": "https://localhost:3000"
}


InitiateMongoServer();


const app = express(); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOpts))

app.use('/service', service);

app.use('/graph', graph);
app.use(function (req, res, next) {
    res.status(404).send("There is nothing to be seen!")
});

// app.listen(process.env.PORT, (req, res) => {
//     console.log(`Server started on port ${process.env.PORT}`);
// }); 

https.createServer(httpsOptions, app).listen(process.env.PORT, (req, res) => {
    logger(`HTTPS Server started on port ${process.env.PORT}`)
})