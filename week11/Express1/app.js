const postBtn = document.getElementById("post");
const getBtn = document.getElementById("get");
const putBtn = document.getElementById("put");

//call to get all the stuff from the posts
getBtn.addEventListener("click", function () {
    info.innerHTML = '';
    axios.get("http://localhost:8020/posts/")
    .then((request) => {
        console.log(request);
        for (let i = 0; i < request.data.length; i++) {
            let htVar = `
            <p>${i} title: ${request.data[i].title} content: ${request.data[i].content}
            `
            info.innerHTML += htVar;
        }
    })
    .catch((error) => {
        console.log(`Get error... ${error}`)
    });
})

//event listener to add an item to posts
postBtn.addEventListener("click", function () {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    //console.log(title, content);
    axios.post("http://localhost:8020/posts", {
            title: title,
            content: content
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(`POST error... ${error}`)
        });
})


//event listener to PUT/UPDATE an item
putBtn.addEventListener("click", function() {
    const putID = document.getElementById("putId").value;
    const putTitle = document.getElementById("putTitle").value;
    const putContent = document.getElementById("putContent").value;

    axios.put(`http://localhost:8020/posts/${putID}`, {
        title: putTitle,
        content: putContent
    })
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(`PUT error... ${error}`)
    });
})