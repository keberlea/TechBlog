document.querySelector("#update").addEventListener("click",event=>{
    event.preventDefault();
    const postId = document.querySelector("#hiddenPostId").value;
    const editPost = {
        title:document.querySelector("#editedTitle").value,
        content:document.querySelector("#editedContent").value,
    }
    console.log(postId);
    console.log(editPost);
    fetch((`/api/posts/${postId}`),{
        method:"PUT",
        body:JSON.stringify(editPost),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log("Post updated")
            location.href="/dashboard"
        } else {
            alert("please try again")
        }
    })
})

document.querySelector("#delete").addEventListener("click",event=>{
    event.preventDefault();
    const postId = document.querySelector("#hiddenPostId").value;
    fetch((`/api/Posts/${postId}`),{
        method:"DELETE",
    }).then(res=>{
        if(res.ok){
            console.log("Post deleted")
            location.href="/dashboard"
        } else {
            alert("please try again")
        }
    })
})