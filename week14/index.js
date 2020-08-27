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


// get a single tweet and replies associated
app.get('/api/posts/:id', function (req, res) {
    let reqId = req.params.id;
    if (reqId != '') {
        db.query(`SELECT posts.tweet, posts.date_of_tweet, posts.user_who_left_tweet, replies.reply, replies.date_of_reply
                FROM posts
                JOIN replies ON posts.id = replies.post_id
                WHERE posts.id = ${reqId}`)
            .then(function (oneItem) {
                console.log(oneItem);
                res.send(oneItem);
            });
    } else {
        res.send("Please select a valid Tweet ID...");
    }
});


// post a tweet
app.post('/api/insert', function (req, res) {
    //console.log(req.body);
    if (req.body.tweet != '' || req.body.name != '') {
        db.query(`INSERT INTO posts ("tweet", "user_who_left_tweet", "is_tweet_deleted") VALUES('${req.body.tweet}', '${req.body.name}', 'FALSE') RETURNING *`)
            .then((results) => {
                res.json(results);
                console.log(results);
            })
    } else {
        res.send("Please enter a name and tweet");
    }
});


// post a reply 
// ------ find a way to get post_id from front end to put into query below -------
app.post('/api/reply', function (req, res) {
    //console.log(req.body);
    if (req.body.reply != '') {
        db.query(`INSERT INTO replies (post_id, reply, is_reply_deleted)
        VALUES (4, '${req.body.reply}', FALSE)`)
            .then(function (item) {
                console.log(item);
                res.json(item);
            });
    }
});



// delete a tweet
app.get('/api/delete/:id', function (req, res) {
    let reqId = req.params.id;
    if (reqId != '' || !reqId) {
        db.query(`UPDATE posts SET is_tweet_deleted = TRUE WHERE id = ${reqId}`)
            .then(function (delItem) {
                console.log(delItem);
                res.json(delItem);

            });
    } else {
        res.send("Please select a valid tweet ID")
    }

});



// delete a reply
app.get('/api/deletereply/:id', function (req, res) {
    let reqId = req.params.id;
    if (reqId != '' || !reqId) {
        db.query(`UPDATE replies SET is_reply_deleted = TRUE WHERE id = ${reqId}`)
            .then(function (delReply) {
                console.log(delReply);
                res.json(delReply);
            });
    } else {
        res.send("Please select a valid reply ID");
    }
});




app.listen(portNumber, function () {
    console.log(`My API is listening on port ${portNumber}.... `);
});