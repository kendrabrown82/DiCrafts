const express = require('express');
const app = express();
const promise = require('bluebird');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// pg-promise initialization options:
const initOptions = {
    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise, 
};

// Database connection parameters:
const config = {
    host: 'localhost',
    port: 5432,
    database: 'music',
    user: 'filmonkesete'
};

// Load and initialize pg-promise:
const pgp = require('pg-promise')(initOptions);
// Create the database instance:
const db = pgp(config);

// route for artists
app.get('/api/artists', (req, res) => { 
    db.query('SELECT * FROM artists')
    .then(function (results) {
        results.forEach(function (r) {
        console.log(r.name);
        });
        res.json(results);
    });
    
});

// route for album
app.get('/api/albums', (req, res) => { 
    db.query('SELECT * FROM albums')
    .then(function (results) {
        results.forEach(function (r) {
        console.log(r.name);
        });
        res.json(results);
    });
    
});

// post to artists
app.post('/api/artists', (req, res) => { 
    if(req.body.name != '' && typeof req.body.name !== 'undefined'){
        db.result(`INSERT INTO artists (name) VALUES ('${req.body.name}')`)
        .then(function (result) {
        console.log(result);
        });
        res.send('OK');
    }else {
        res.send('artists need a name');
    }
});

  
const portNumber = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.listen(portNumber, function() {
  console.log(`My API is listening on port ${portNumber}.... `);
});