const express = require('express');
const app = express();
const promise = require('bluebird');
const portNumber = process.env.PORT || 3000;

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

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static( __dirname + '/web'));

app.get('/api/artists', function (req, res) {
  db.query('SELECT * FROM artists')
      .then(function (results) {
        results.forEach(function (artist) {
          console.log(artist.name);
        });

        res.json(results);
      });
});

app.get('/api/artists_albums', function (req, res) {
  db.query('SELECT artists.name AS artist_name, albums.name AS album_name, \
  albums.release_date, albums.genre FROM artists \
  JOIN album_artist on album_artist.artist_id = artists.id \
  JOIN albums on albums.id = album_artist.album_id')
      .then(function (results) {
        res.json(results);
      });
});

app.post('/api/artists_albums', function (req, res) {

  if ( req.body.name != '' && typeof req.body.name !== 'undefined' ) {
    db.query(`SELECT artists.name AS artist_name, albums.name AS album_name, \
    albums.release_date, albums.genre FROM artists \
    JOIN album_artist on album_artist.artist_id = artists.id \
    JOIN albums on albums.id = album_artist.album_id WHERE artists.name = '${req.body.name}'`)
        .then(function (results) {
          res.json(results);
        });
  } else if ( req.body.album_id != '' && typeof req.body.album_id !== 'undefined' &&
             req.body.artist_id != '' && typeof req.body.artist_id !== 'undefined') {

    db.query(`INSERT INTO album_artist("artist_id", "album_id") \
    VALUES(${req.body.artist_id}, ${req.body.album_id})`)
    .then(function (results) {
      res.send('OK');
    });

  } else {
    res.send('fail');
  }   
});


app.post('/api/artists', function (req, res) {
  if(req.body.name != '' && typeof req.body.name !== 'undefined') {
    db.query(`INSERT INTO artists (name) VALUES ('${req.body.name}') RETURNING *`)
    .then(function (result) {
      console.log(result);
    });
    res.send('OK');
  }else {
    res.send('artists need a name');
  }
});

app.get('/api/albums', function (req, res) {
  db.query('SELECT * FROM albums')
      .then(function (results) {
        results.forEach(function (album) {
          console.log(album.name);
        });

        res.json(results);
      });
});

app.listen(portNumber, function() {
  console.log(`My API is listening on port ${portNumber}.... `);
});