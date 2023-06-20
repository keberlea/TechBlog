document.querySelector("#newComment").addEventListener("submit",event=>{
    event.preventDefault();
    const comment = {
        body:document.querySelector("#comment").value,
        blogId:document.querySelector("#hiddenCommentId").value,
    }
    fetch("/api/comments",{
        method:"POST",
        body:JSON.stringify(comment),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log("comment posted")
            location.reload()
        } else {
            alert("please try again")
        }
    })
})