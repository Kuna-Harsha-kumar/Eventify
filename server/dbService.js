const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');

console.log("HOST:", process.env.HOST);
console.log("USER:", process.env.MYSQL_USER);
console.log("DATABASE:", process.env.DATABASE);
console.log("PORT:", process.env.DB_PORT);

class DbService {
    static instance = null;

    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.MYSQL_USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: process.env.DB_PORT
        });

        this.dbConnectPromise = new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    reject(new Error('Error connecting to DB: ' + err.message));
                } else {
                    resolve('Connected to DB');
                }
            });
        });
    }

    static getDbServiceInstance() {
        if (!DbService.instance) {
            DbService.instance = new DbService();
        }
        return DbService.instance;
    }

    async checkLoginCredentialsAdmin(username, password) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM admindetails WHERE username = ? AND password = ?;";
    
                this.connection.query(query, [username, password], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
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

    async checkLoginCredentialsUser(username, password) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM userdetails WHERE username = ? AND password = ?;";
    
                this.connection.query(query, [username, password], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
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

                this.connection.query(query, [name, showtime, showdate, nooftickets, username], (err, result) => {
                    if (err) reject(new Error(err.message));
                    console.log("result" + result); 
                    resolve(result);
                });
            });
            return {
                name : name,
                showtime : showtime,
                showdate: showdate,
                nooftickets: nooftickets,
                username: username
            };
        } catch (error) {
            console.log(error);
        }
    }

    async getAllData(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM paymentdetails WHERE name = ?;";
                console.log("query=" + query);
                this.connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
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

                this.connection.query(query, [username], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async Admindetails(username, emailid, password) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO admindetails (username, emailid, password) VALUES (?,?,?);";

                this.connection.query(query, [username, emailid, password], (err, result) => {
                    if (err) reject(new Error(err.message)); 
                    resolve(result);
                });
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

    async Userdetails(username, emailid, password) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO userdetails (username, emailid, password) VALUES (?,?,?);";

                this.connection.query(query, [username, emailid, password], (err, result) => {
                    if (err) reject(new Error(err.message)); 
                    resolve(result);
                });
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

    async AdminShowDetails(showname, showmonth, showcategory, location, imgsrc, showstartdate, showenddate, showcontent, ticket_cost, taxes) {
        try {
            console.log(showname);
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO adminbookingdetails (showname, showmonth, showcategory, location, showstartdate, showenddate, imgsrc, showcontent) VALUES (?,?,?,?,?,?,?,?);";

                this.connection.query(query, [showname, showmonth, showcategory, location, showstartdate, showenddate, imgsrc, showcontent], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return {
                showname : showname,
                showmonth: showmonth,
                showcategory: showcategory,
                location: location,
                showstartdate: showstartdate,
                showenddate: showenddate,
                showcontent: showcontent
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

                this.connection.query(query, [showname, ticket_cost, taxes], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
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
                this.connection.query(query, [showmonth], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
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
                this.connection.query(query, [category], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getTotalTicketsPerUser() {
        try {
          const response = await new Promise((resolve, reject) => {
            const query = `
              SELECT username, SUM(nooftickets) AS total_tickets
              FROM bookingdetails
              GROUP BY username;
            `;
            this.connection.query(query, (err, results) => {
              if (err) reject(new Error(err.message));
              resolve(results);
            });
          });
          return response;
          console.log(response);
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

      async getMonthlyBookingTotals() {
        try {
          const response = await new Promise((resolve, reject) => {
            const query = `
              SELECT DATE_FORMAT(showdate, '%Y-%m') AS month, COUNT(*) AS bookings
              FROM bookingdetails
              GROUP BY month;
            `;
            this.connection.query(query, (err, results) => {
              if (err) reject(new Error(err.message));
              resolve(results);
            });
          });
          return response;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      async getTotalTicketsPerShow() {
        try {
          const response = await new Promise((resolve, reject) => {
            const query = `
              SELECT name, SUM(nooftickets) AS total_tickets
              FROM bookingdetails
              GROUP BY name
              ORDER BY total_tickets DESC;
            `;
            this.connection.query(query, (err, results) => {
              if (err) reject(new Error(err.message));
              resolve(results);
            });
          });
          return response;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      async getTotalRevenuePerBooking() {
        try {
          const response = await new Promise((resolve, reject) => {
            const query = `
              SELECT b.name, u.username, (b.nooftickets * p.ticket_cost) AS total_revenue
              FROM bookingdetails b
              JOIN userdetails u ON b.username = u.username
              JOIN paymentdetails p ON p.name = b.name;
            `;
            this.connection.query(query, (err, results) => {
              if (err) reject(new Error(err.message));
              resolve(results);
            });
          });
          return response;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
                  
      
}

module.exports = DbService;


// OLAP:


// SELECT username, SUM(nooftickets) AS total_tickets
// FROM bookingdetails
// GROUP BY username;

// SELECT DATE_FORMAT(showdate, '%Y-%m') AS month, COUNT(*) AS bookings
// FROM bookingdetails
// GROUP BY month;

// SELECT name, SUM(nooftickets) AS total_tickets
// FROM bookingdetails
// GROUP BY name
// ORDER BY total_tickets DESC;

// SELECT b.name, u.username, (b.nooftickets*p.ticket_cost) AS total_revenue
// FROM bookingdetails b
// JOIN userdetails u ON b.username = u.username
// join bookingdetails b2  on b2.name =b.name
// JOIN paymentdetails p on p.name =b.name;