var username=localStorage.getItem('username');
var showmonth1=document.title;
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getHighlightsbymonth',{
    method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({ showmonth1:showmonth1})
   })
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

function loadHTMLTable(data) {
    var show=document.getElementById('shows');
    let image = "";
    for (let i = 0; i < data.length; i++) {
        const person = data[i];
       
    image+=`<div id="shows" class="shows">`;
    image+=`<div id="imgleft" class="imgleft">`;
    image+=`<img src="${person.imgsrc}" width="300" height="300"/>`;
    image+=`</div>`;
    image+=`<div id ="textright" class="textright">`;
    image+=`<H3>${person.showname}</H3>`;
    image+=`<P>${person.showcontent}</P>`;
    image+=`<P>${person.location}</P>`;
    image+=` <a href="BookTicket.html?data=${person.showname}">Buy Tickets</a>`;  
    image+=`</div>`;
    image+=`</div>`;
    } 
    show.innerHTML=image;
}


function bookticket(){
    if(username==null){
       alert("Login to book tickets");
       window.location.href="Main_Frame.html";
    }
}
