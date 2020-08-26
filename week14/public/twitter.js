$(document).ready(function () {
    console.log("ready");
    loadTweets();
    
    function loadTweets() {
        $('#listBtn').click(function () {
            $.get('/api/posts').then(function (posts) {
                console.log(posts);
            });
      
        });
    }

   // adding tweet
    $('#addBtn').click(function () {
        console.log($("#name").val());
        console.log($("#tweet").val());

        $.post('/api/insert', { "tweet" : $("#tweet").val(), "name": $("#name").val() }, 
        function (response) {
            console.log(response);
          })

    });


}); // <----- document