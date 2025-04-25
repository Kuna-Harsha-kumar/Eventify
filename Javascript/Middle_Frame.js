
var username=localStorage.getItem('username');
console.log(localStorage.getItem('username'));
if(localStorage.getItem('username')==null){
    document.getElementById('user').innerHTML="LOGIN/SIGNUP";
}
else{
    document.getElementById('user').innerHTML=username;
}