const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static will only serve 'get' requests!
app.use(express.static(__dirname + '/public'));

let blogPosts = [];
let blogIndex = 1;

app.get('/api/posts', function (req, res) {
  res.send(blogPosts);
})

app.post('/api/posts', function (req, res) {
  if(req.body.title != '' && req.body.content != '') {
      blogPosts.push({
        title: req.body.title,
        content: req.body.content
        
      });
      blogIndex++;
      res.send('OK, it has been posted');
  } else {
      res.status(402).send(`missing title or content`);
  }
})

app.delete('/api/posts/:id', (req, res) => {
    if(!blogPosts[req.params.id]) {
        res.status(404).send("Blog Post not found...");
    }

    blogPosts.splice(req.params.id, 1);
    console.log("Blog post deleted...");
    res.send(blogPosts);
})

app.listen(3000, function() {
  console.log('My API is listening on port 000.... ');
});