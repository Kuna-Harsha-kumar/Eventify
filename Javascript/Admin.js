

const form = document.querySelector('#form');
var showenddateInput=document.getElementById('showenddate');
var showstartdateInput=document.getElementById('showstartdate');
var locationInput=document.getElementById('location');
var imageInput=document.getElementById('image');
var shownameInput=document.getElementById('showname');
var showmonthInput=document.getElementById('showmonth');
var showcategoryInput=document.getElementById('showcategory');
var showcontentInput=document.getElementById('showcontent');
var showticketcostInput=document.getElementById('ticket_cost');
var showtickettaxesInput=document.getElementById('taxes');

localStorage.setItem('showmonth', showmonthInput.value);
form.addEventListener('submit', (event) => {
   event.preventDefault();
   const formData = new FormData();
   formData.append('showenddate', showenddateInput.value);
   formData.append('showstartdate', showstartdateInput.value);
   formData.append('location', locationInput.value);
   formData.append('image', imageInput.files[0]);
   formData.append('showname', shownameInput.value);
   formData.append('showmonth', showmonthInput.value);
   formData.append('showcategory', showcategoryInput.value);
   formData.append('showcontent',showcontentInput.value);
   formData.append('ticket_cost',showticketcostInput.value);
   formData.append('taxes',showtickettaxesInput.value);
   let formDataValues = {};
for (let [key, value] of formData.entries()) {
  formDataValues[key] = value;
}
var showname=formDataValues['showname'];
var showenddate=formDataValues['showenddate'];
var showmonth=formDataValues['showmonth'];
var showstartdate=formDataValues['showstartdate'];
var location=formDataValues['location'];
var showcategory=formDataValues['showcategory'];
var image=formDataValues['image'];
var showcontent=formDataValues['showcontent']
var imagename=image.name;
var ticket_cost=formDataValues['ticket_cost'];
var taxes=formDataValues['taxes'];
console.log(image.name);
const request1 = fetch('http://localhost:3000/adminshowdetails', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({showname:showname, showmonth:showmonth, showcontent:showcontent, showcategory:showcategory, showstartdate:showstartdate, showenddate:showenddate, location:location, imagename:imagename, showcontent:showcontent})
})
.then(response => response.json());

const request2 = fetch('http://localhost:3000/adminshowticketdetails', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({showname:showname, ticket_cost:ticket_cost, taxes:taxes})
})
.then(response => response.json());

if(request1!=null && request2!=null){
    logindetails();
}
});

function logindetails(){

    alert("Show Details Added Successfully.\n You can check it in the website.");
    window.location.href="Main_Frame.html";
  
}


