document.querySelector("#newComment").addEventListener("submit", event => {
    event.preventDefault();
    const newComment = {
        comment_text: document.querySelector("#comment").value,
        post_id: document.querySelector("#CommentId").value,
    }
    console.log(document.querySelector("#comment").value);
    console.log(document.querySelector("#CommentId").value);
    fetch("/api/comments",{
        method:"POST",
        body:JSON.stringify(newComment),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log(newComment,"comment posted")
            location.reload()
        } else {
            console.log(newComment)
            alert("please try again")
           
        }
    })
    
})