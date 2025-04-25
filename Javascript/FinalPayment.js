var nooftickets1 = localStorage.getItem('nooftickets');
var taxes = 0.07;
var ticketcost = 10;
var taxes = 0.07*10*nooftickets1;

console.log(nooftickets1)
var nooftickets=document.getElementById('nooftickets');
nooftickets.innerHTML=nooftickets1;
var ticketscost=nooftickets1*ticketcost;
var totalcost=taxes+ticketscost;

document.getElementById('taxes').innerHTML=taxes;
document.getElementById('ticketcost').innerHTML=ticketcost;
document.getElementById('totalcost').innerHTML=totalcost;

function submitpayment(){
    alert("Tickets Booked Successfully.\n You can check the details of the booked show in the history.")
    window.location.href="Main_Frame.html";
}



   
