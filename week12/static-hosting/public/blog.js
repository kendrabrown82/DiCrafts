$( document ).ready(function() {
    console.log( " Ready! " );
    getBlogPosts();
   
    $('#createPost').click(function () {
      // let title = document.getElementById('title').value;
      let title = $('#title').val();
   
      // let content = document.getElementById('content').value;
      let content = $('#content').val();
   
      $.post('/api/posts',
      { 
        "title": title,
        "content": content
      },
      function (response){
        console.log(response);
        getBlogPosts();
        $('#title').val('');
        $('#content').val('');
      }
      );
    })
   
    function getBlogPosts() {
      $.get('/api/posts', function (blogPosts) {
       let blogContainer = $('#blogPosts');
       blogContainer.html('');
         blogPosts.forEach(function (post, index) {
           blogContainer.append(renderPost(post, index));
         });
      });
    }
   
    function renderPost(post, index) {
      return `
      <div class="col-12">
       <h1>${post.title}</h1>
       <p>${post.content}</p>
       <button class="deleteButton" value="${index}">Delete Post</button>
      </div>
      `
    }
   
   
    $('#blogPosts').on('click', '.deleteButton', function (element) {
     console.log(element.target.value);
     $.ajax({
       type: "DELETE",
       url: '/api/posts/' + element.target.value
     }).done(function (response){
       console.log(response);
       getBlogPosts();
     });
   });
   });