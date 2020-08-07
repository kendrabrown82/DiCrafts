const btn = document.getElementById("btn");

//call to get all the stuff from the posts
axios.get("http://localhost:8040/posts")
    .then((request) => {
        return request;
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(`Got an error of ${error}`)
    });

    
//event listener to add an item to posts
btn.addEventListener("click", function () {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    console.log(title, content);
    axios.post("http://localhost:8040/posts", {
        title: title,
        content: content
    })
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(`Got an error of ${error}`)
    });
})