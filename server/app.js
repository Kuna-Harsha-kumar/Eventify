const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const multer = require('multer')
const path = require('path')

const dbService = require('./dbService');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../images/')    
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});

// create
app.post('/bookings', (request, response) => {
    console.log(request.body.name);
    const  name  = request.body.name;
    const  showtime =request.body.showtime;
    const  showdate  = request.body.showdate;
    const  nooftickets =request.body.nooftickets;
    const username=request.body.username;
    const db = dbService.getDbServiceInstance();
    const result = db.Bookingdetails(name,showtime,showdate, nooftickets,username);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// read
app.get('/payments/:name', (request, response) => {
    console.log("It's calling this");
    console.log("app:"+request.params.name);
    const name=request.params.name;
    const db =dbService.getDbServiceInstance();
    const result = db.getAllData(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.get('/getHistoryAll/:username', (request, response) => {

    const username=request.params.username;
    console.log(username);
    const db = dbService.getDbServiceInstance();

    const result = db.getAllHistoryData(username);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.post('/registerasoption', (request, response) => {
    console.log(request.body.registeras);
    const  username  = request.body.username;
    const  emailid =request.body.emailid;
    const  password  = request.body.password;
    const  registeras =request.body.registeras;
    const db = dbService.getDbServiceInstance();
    let result=null;
    if(registeras=="Admin"){
        result = db.Admindetails(username,emailid,password);
    }
    else{
        result=db.Userdetails(username,emailid,password);
    }

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});







app.post('/adminshowdetails',upload.single('image'),(request, response) => {
    const showname=request.body.showname;
    const showmonth=request.body.showmonth;
    const showenddate=request.body.showenddate;
    const showstartdate=request.body.showstartdate;
    const showcategory=request.body.showcategory;
    const imagename=request.body.imagename;
    const location=request.body.location;
    const showcontent=request.body.showcontent;
    const ticket_cost=request.body.ticket_cost;
    const taxes=request.body.taxes;
    console.log("hjki"+imagename);
    var imgsrc = '../images/' + imagename;
  const db = dbService.getDbServiceInstance();
  const result = db.AdminShowDetails(showname, showmonth, showcategory, location, imgsrc, showenddate, showstartdate, showcontent, ticket_cost, taxes);
  console.log("result"+result);
  result.then(data => {
    response.json({ data: data });
  }).catch(err => {
    console.log(err);
    response.status(500).json({ error: err });
  });
});

app.post('/adminshowticketdetails',(request, response) => {
    const showname=request.body.showname;
    const ticket_cost=request.body.ticket_cost;
    const taxes=request.body.taxes;
  const db = dbService.getDbServiceInstance();
  const result = db.AdminShowticketDetails(showname, ticket_cost, taxes);
  result.then(data => {
    response.json({ data: data });
  }).catch(err => {
    console.log(err);
    response.status(500).json({ error: err });
  });
});


app.post('/getHighlightsbymonth', (request, response) => {
    console.log("dfghj");
    const showmonth=request.body.showmonth1;
    const db = dbService.getDbServiceInstance();

    const result = db.getHighlightsbymonth(showmonth);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.post('/getHighlightsbycategory', (request, response) => {
    const category=request.body.category;
    const db = dbService.getDbServiceInstance();

    const result = db.getHighlightsbycategory(category);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.post('/login', (request, response) => {
    const { username, password, loginas } = request.body;
    const db = dbService.getDbServiceInstance();
    let result=null;
    if(loginas=="Admin"){
       
     result = db.checkLoginCredentialsAdmin(username, password);
     console.log(result);
    }
    else{
        result = db.checkLoginCredentialsUser(username, password);
    }
   
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
    })
 


  

app.listen(process.env.PORT, () => console.log('app is running'));