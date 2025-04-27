var nameInput=localStorage.getItem('name');
form1.addEventListener('submit',(event)=>{
    event.preventDefault();
    var name=nameInput;
    fetch('http://localhost:3001/payments/' + name)
    .then(response => response.json())
    .then(data => paymentdetails(data['data']));
});
function paymentdetails(data){
    for (let i = 0; i < data.length; i++) {
        var person=data[i];
    console.log("This is Data",data);
    const taxes = person.Taxes;
    const ticketCost = person.Ticket_cost;
    localStorage.setItem('taxes', taxes);
    localStorage.setItem('ticketcost', ticketCost);
    }
    window.location.href="FinalPayment.html";
    
}



