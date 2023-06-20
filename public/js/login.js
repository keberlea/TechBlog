document.querySelector('#login').addEventListener('submit', event => {
    event.preventDefault();
    const userLogin ={
        username: document.querySelector('#loginusername').value,
        password: document.querySelector('#loginpassword').value
    }
    console.log(userLogin)
    fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(userLogin),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        if(res.ok){
            console.log("user is logged in");
            location.href = "/dashboard";
        } else {
            alert("please try again");
        }
    });
});