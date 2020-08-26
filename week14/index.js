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
    database: 'twitter_db',
    user: 'filmonkesete'
};

// Load and initialize pg-promise:
const pgp = require('pg-promise')(initOptions);

// Create the database instance:
const db = pgp(config);

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.use(express.static(__dirname + '/public'));



// get all tweets
app.get('/api/posts', function (req, res) {
    db.query('SELECT * FROM posts WHERE is_tweet_deleted = FALSE')
        .then(function (results) {
            results.forEach(function (post) {
                console.log(post);
            });

            res.json(results);
        });
});


// get a single tweet
app.get('/api/posts/:id', function (req, res) {
    let reqId = req.params.id;
    db.query(`SELECT posts.tweet, posts.date_of_tweet, posts.user_who_left_tweet, replies.reply, replies.date_of_reply
              FROM posts
              JOIN replies ON posts.id = replies.post_id
              WHERE posts.id = ${reqId}`)
        .then(function (oneItem) {
            console.log(oneItem);
            res.send(oneItem);
        });
});


// post a tweet
app.post('/api/insert', function (req, res) {
    //console.log(req.body);
    db.query(`INSERT INTO posts ("tweet", "user_who_left_tweet") VALUES('${req.body.tweet}', '${req.body.name}') RETURNING *`)
        .then((results) => {
            res.json(results);
        })
     
});


// post a reply
app.post('/api/reply', function (req, res) {
    db.query(`INSERT INTO replies (post_id, reply, date_of_reply, is_reply_deleted)
    VALUES (4, 'bassdfdshh', '1989/05/16', FALSE)`)
        .then(function (item) {
            console.log(item);
            res.json(item);
        });

});



// delete a tweet
app.get('/api/delete/:id', function (req, res) {
    let reqId = req.params.id;
    db.query(`UPDATE posts SET is_tweet_deleted = TRUE WHERE id = ${reqId}`)
        .then(function (delItem) {
            console.log(delItem);
            res.json(delItem);

        });

});



// delete a reply
app.get('/api/deletereply/:id', function (req, res) {
    let reqId = req.params.id;
    db.query(`UPDATE replies SET is_reply_deleted = TRUE WHERE id = ${reqId}`)
        .then(function (delReply) {
            console.log(delReply);
            res.json(delReply);
        });
});




app.listen(portNumber, function () {
    console.log(`My API is listening on port ${portNumber}.... `);
});