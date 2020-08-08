//Importing the other developers code
var express = require('express');
//Instaniate application, assign to variable called app
const app = express();
//Pulls in the body parrser for parsing data
const bodyParser = require("body-parser");
//Add to to the app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//To prevent CORS issues
var cors = require('cors')
app.use(cors());


var articles = [];
app.get('/', function (req, res) {
    console.log("GET Request Received");
    res.json(['Abc', '123', 'DoeRayMe']);
})
app.get('/posts', function (req, res) {
    console.log("GET Request Received");
    res.json(articles);
})
app.get('/posts/:id', function (req, res) {
    var id = req.params.id;
    if(!articles[id]){
        res.status(404).send("Article Not Found");
    }
    var article = articles[id];
    res.json(article);
})
app.post('/posts', function (req, res) {
    var data = req.body;
    if(!data['title']){
        res.status(410).send("Requires a title");
    }
    if(!data['content']){
        res.status(410).send("Requires some content");
    }
    articles.push(data);
    res.json(data);
})
app.put('/posts/:id', function(req, res){
    var id = req.params.id;
    if(!articles[id]) {
        res.status(404).send("Article does not exist");
    }
    var title = req.body.title;
    var content = req.body.content;
    articles[id]['title'] = title;
    articles[id]['content'] = content;
    res.json(articles[id]);
})
app.get('/comments', function (req, res) {
    console.log("GET Request Received");
    res.send("Comments Are Being Read");
})
app.post('/comments', function (req, res) {
    console.log("POST Request Received");
    res.send('New Comment Created');
})
//PORT ENVIRONMENT VARIABLE
const port = 8020;
app.listen(port, () => console.log(`Listening on port ${port}..`));

