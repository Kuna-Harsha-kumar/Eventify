const mysql = require('mysql2');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});


connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
     console.log('db ' + connection.state);
});


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    async checkLoginCredentialsAdmin (username, password) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM admindetails WHERE username = ? AND password = ?;";
    
                connection.query(query, [username, password], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response.length);
            if (response.length > 0) {
                
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async checkLoginCredentialsUser (username, password) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM userdetails WHERE username = ? AND password = ?;";
    
                connection.query(query, [username, password], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
    
            if (response.length > 0) {
                
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    async Bookingdetails(name, showtime, showdate, nooftickets, username) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO bookingdetails (name, showtime, showdate, nooftickets, username) VALUES (?,?,?,?,?);";

                connection.query(query, [name, showtime, showdate, nooftickets, username] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    console.log("result"+result); 
                    resolve(result);
                })
            });
            return {
                name : name,
                showtime : showtime,
                showdate: showdate,
                nooftickets: nooftickets,
                username:username
            };
        } catch (error) {
            console.log(error);
        }
      }

      
    async getAllData(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM paymentdetails WHERE name = ?;";
                console.log("query="+query);
                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllHistoryData(username) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM bookingdetails WHERE username=?;";

                connection.query(query, [username],(err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async Admindetails(username,emailid,password) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO admindetails (username, emailid, password) VALUES (?,?,?);";

                connection.query(query, [username, emailid, password] , (err, result) => {
                    if (err) reject(new Error(err.message)); 
                    resolve(result);
                })
            });
            return {
                username : username,
                emailid : emailid,
                password: password
            };
        } catch (error) {
            console.log(error);
        }
      }

      async Userdetails(username,emailid,password) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO userdetails (username, emailid, password) VALUES (?,?,?);";

                connection.query(query, [username, emailid, password] , (err, result) => {
                    if (err) reject(new Error(err.message)); 
                    resolve(result);
                })
            });
            return {
                username : username,
                emailid : emailid,
                password: password
            };
        } catch (error) {
            console.log(error);
        }
      }

      async AdminShowDetails(showname, showmonth, showcategory, location, imgsrc, showstartdate, showenddate,showcontent, ticket_cost, taxes) {
        try {
            console.log(showname);
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO adminbookingdetails (showname, showmonth, showcategory, location, showstartdate, showenddate, imgsrc, showcontent) VALUES (?,?,?,?,?,?,?,?);";

                connection.query(query, [showname, showmonth, showcategory, location, showstartdate, showenddate, imgsrc,showcontent] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return {
                showname : showname,
                showmonth: showmonth,
                showcategory: showcategory,
                location: location,
                showstartdate: showstartdate,
                showenddate: showenddate,
                showcontent:showcontent
            };
        } catch (error) {
            console.log(error);
        }
      }


      async AdminShowticketDetails(showname, ticket_cost, taxes) {
        try {
            console.log(showname);
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO paymentdetails (name, ticket_cost, taxes) VALUES (?,?,?);";

                connection.query(query, [showname, ticket_cost, taxes] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return {
                showname : showname,
                ticket_cost: ticket_cost,
                taxes: taxes
            };
        } catch (error) {
            console.log(error);
        }
      }

      async getHighlightsbymonth(showmonth) {
        try {
            console.log(showmonth);
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM adminbookingdetails WHERE showmonth = ?;";
                connection.query(query, [showmonth], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getHighlightsbycategory(category) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM adminbookingdetails WHERE showcategory = ?;";
                connection.query(query, [category], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
    
}

module.exports = DbService;