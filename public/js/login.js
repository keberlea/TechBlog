document.querySelector('#login').addEventListener('submit', event => {
    event.preventDefault();
    const userObj ={
        username: document.querySelector('#loginusername').value,
        password: document.querySelector('#loginpassword').value
    }
    console.log(userObj)
    fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(userObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.ok){
            console.log('success');
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    })
})