$(document).ready(function () {
    console.log("ready");
    loadTweets();

    function loadTweets() {
        $('#listBtn').click(function () {
            let tweetContainer = $('#tweets');
            tweetContainer.html('');
            $.get('/api/posts')
                .then(function (posts) {
                    posts.forEach(function (post) {
                        tweetContainer.append(
                                `<div class="card mt-2" style="width: 18rem;">
                                    <div class="card-body">
                                        <h5 class="card-title">${post.user_who_left_tweet}</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">${post.date_of_tweet}</h6>
                                        <p class="card-text">${post.tweet}</p>
                                        <a href="#" class="card-link">Replies</a>
                                    </div>
                                </div>
                                `);
                    })
                    console.log(posts);

                });

        });
    }

    // adding tweet
    $('#addBtn').click(function () {
        console.log($("#name").val());
        console.log($("#tweet").val());

        $.post('/api/insert', {
                "tweet": $("#tweet").val(),
                "name": $("#name").val()
            },
            function (response) {
                console.log(response);
            })

    });


}); // <----- document