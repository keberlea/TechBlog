var existingPosts = document.querySelector("#existingposts");
var createNew = document.querySelector("#createNew");
var addNewPost = document.querySelector("#addNewPost");
var newPost = document.querySelector("#newPost");

function hideCreateNew() {
    createNew.hidden = true;
}

hideCreateNew();

addNewPost.addEventListener("click", event => {
    event.preventDefault();
    console.log('click');
    existingPosts.hidden = true;
    addNewPost.hidden = true;
    createNew.hidden = false;
});

newPost.addEventListener("submit", event => {
    event.preventDefault();
    var title = document.querySelector("#title").value;
    var content = document.querySelector("#content").value;

    if (!title || !content) {
        alert('Please enter both title and content');
        return;
    }

    const postObj = {
        title: title,
        content: content
    };
    console.log(postObj);
    fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(postObj),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            
            if (res.ok) {
                createNew.setAttribute("hidden", "true");
                location.reload();
            } else {
                alert("Error - please try again");
            }
        });
});
 

