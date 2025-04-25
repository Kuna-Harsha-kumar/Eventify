
var username=localStorage.getItem('username');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const data1 = urlParams.get('data');
document.getElementById('demo').innerHTML="Show Name: "+data1;
function bookticket(){
    if(username==null){
       alert("Login to book tickets");
       window.location.href="Main_Frame.html";
    }
}

var form=document.getElementById('form');
var nameInput=data1;
var showtimeInput=document.getElementById('showtime');
var showdateInput=document.getElementById('showdate');
var noofticketsInput=document.getElementById('nooftickets');

form.addEventListener('submit', (event) => {
   event.preventDefault();
   const name = nameInput;
   const showtime = showtimeInput.value;
   const showdate=showdateInput.value;
   const nooftickets=noofticketsInput.value;
   fetch('http://localhost:5000/bookings', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({ name: name, showtime: showtime, showdate: showdate, nooftickets: nooftickets, username:username })
   })
   .then(response => response.json())
   .then(data => logindetails(data['data']));

});
function logindetails(data){
    console.log("data"+data.name);
    localStorage.setItem('nooftickets', data.nooftickets);
   console.log(localStorage.getItem('nooftickets'));
   localStorage.setItem('name', data.name);
   window.location.href="payment.html";
  
   
}




