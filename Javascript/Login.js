
var form=document.getElementById('form');
var usernameInput=document.forms["form"].username;
var passwordInput=document.forms["form"].password;
var loginasInput=document.forms["form"].loginas;
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
	const loginas=loginasInput.value;
    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password , loginas: loginas})
    })
    .then(response => response.json())
    .then(data => logindetails(data));
});

function logindetails(data){
    if(loginasInput.value=="Admin"){
		if(data.data){
        window.location.href="Admin.html";
    }
    else{
        alert("Username or Password is incorrect for admin access");
    }
}
	if(loginasInput.value=="User") {
		if(data.data){
		localStorage.setItem('username',usernameInput.value);
        window.location.href="Main_Frame.html";
    }
    else{
        alert("Username or Password is incorrect for user access");
    }
}
}
