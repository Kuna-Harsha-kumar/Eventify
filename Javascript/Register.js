var form=document.getElementById('form');
var usernameInput=document.getElementById('username');
var emailidInput=document.getElementById('emailid');
var passwordInput=document.getElementById('pswrd');
var retypepasswordInput=document.getElementById('pswrd2');
var registerasInput=document.getElementById('registeras');
    
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const emailid = emailidInput.value;
    const password=passwordInput.value;
    const retypepassword=retypepasswordInput.value;
    const registeras=registerasInput.value;
    if(password==retypepassword){
    fetch('http://localhost:5000/registerasoption', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, emailid: emailid, password: password, registeras: registeras })
    })
    .then(response => response.json())
    .then(data => register(data['data']));
}
else{
    alert("Both passwords doesn't match");
}
 });

 
 function register(data){
    
    alert("You are succesfully registered.\n You can login now.");
    window.location.href="Login.html";
 }
