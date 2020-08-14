const btn = document.getElementById("btn");

let blog = []

//event listener to add an item to posts
btn.addEventListener("click", function () {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const showResults = document.querySelector(".showResults")
  if (title == "" || content == "") {
    alert("Please enter a value")
    return
  }

  console.log(title, content);
  axios.post("http://localhost:8040/posts", {
    title: title,
    content: content
  })
    .then((response) => {

      console.log(response)
      let findTitle = document.getElementById('findTitle')
      let titleOption = document.createElement('option')
      titleOption.innerText = response.data.title
      findTitle.appendChild(titleOption)

      // showResults.innerHTML=(`Your title posted is: ${title}. Your content posted is: ${content}`)
      document.getElementById("title").value = "";
      document.getElementById("content").value = "";

      blog.push(response.data)
      console.log(blog)
    })
    .catch((error) => {
      console.log(`Got an error of ${error}`)
    });
})

const getBtn = document.getElementById('getBtn')

getBtn.addEventListener("click", function () {
  let el = document.getElementById("findTitle");
  let elItem = el.selectedIndex - 1;
  console.log(elItem);

  axios.get(`http://localhost:8040/posts/${elItem}`, {
  })
    .then((response) => {

    let showResults = document.querySelector("body > div.container-fluid > div.row.mt-5 > div.col-5 > div.col-5 > div")
    let showContent = document.createElement("div")

    let contentBlog = response.data.content
    let title = response.data.title
    ///////new stuff//////
    showResults.innerHTML = '';
    ///// new stuff////

    showContent.innerHTML = `${title} and ${contentBlog}`
    showResults.appendChild(showContent)
    })
    .catch((error) => {
      console.log(`Got an error of ${error}`)
    })
})

const getBtnAll = document.getElementById('getBtnAll')

getBtnAll.addEventListener("click", function () {
  axios.get(`http://localhost:8040/posts/`, {
  })
    .then((response) => {
    for (let i=0; i<response.data.length; i++) {
    let showResults = document.querySelector("body > div.container-fluid > div.row.mt-5 > div.col-5 > div.col-5 > div")
    let showContent = document.createElement("div")

    let contentBlog = response.data[i].content
    let title = response.data[i].title
    showContent.innerHTML = `${title} and ${contentBlog}`

    showResults.appendChild(showContent)
    }

    ///////////////////////////////// new stuff /////////////////
    let findTitle = document.getElementById('findTitle')
    for (let k = 0; k < response.data.length; k++) {
        let titleOption = document.createElement('option')
        titleOption.innerText = response.data[k].title
        findTitle.appendChild(titleOption)
    ///////////////////////////////// new stuff /////////////////
    }
    return response
    })
    .catch((err) => {
      console.log(`Got an error of ${error}`)
    })
    
})

const delBtn = document.getElementById("deleteBtn");

delBtn.addEventListener("click", function() {
  let del = document.getElementById("findTitle");
  let delItem = del.selectedIndex - 1;
  console.log(delItem);

  axios.delete(`http://localhost:8040/posts/${delItem}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(`${error} .... delete error`);
    })
})