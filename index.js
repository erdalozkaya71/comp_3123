var http = require("http");

// Import the employees array from the employee module
const employee = require('./Employee'); // Make sure the path is correct

// Now, you can use the employees array in this file
console.log(employee);

// Print a message to the console
console.log("Lab 03 - NodeJs");

// Define the server's port number
const SERVER_PORT = 8081;

// Create a web server using the 'http' module
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
    } else {
        if (req.url === '/') {
            // Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.write("<h1>Welcome to Lab Exercise 03</h1>");
            res.end();
        }

        if (req.url === '/employee') {
            // Display all details for employees in JSON format
            if (req.method == "POST") {
                res.write("<h1>Employee</h1>");
                const employees = employee.employees; // Access the employees array from the module
                res.write(JSON.stringify(employees));
                res.end();
            } else {
                const error = { message: "Error: Use POST method to send the request" };
                res.write(JSON.stringify(error));
                res.end();
            }
        }

        if (req.url === '/employee/names') {
            // Display only all employees {first name + lastname} in Ascending order in JSON Array
            const names = employee.employees.map(employee => `${employee.firstName} ${employee.lastName}`);
            names.sort(); // Sort the names in ascending order
            res.write(JSON.stringify(names));
            res.end();
        }

        if (req.url === '/employee/totalsalary') {
            // Display Sum of all employees' salary in given JSON format
            const totalSalary = employee.employees.reduce((acc, employee) => acc + employee.Salary, 0);
            res.write(`{ "total_salary" : ${totalSalary} }`);
            res.end();
        }

        // Return a 404 error for unrecognized routes
        res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
    }
});

server.listen(SERVER_PORT, () => { // Corrected the variable name from 'port' to 'SERVER_PORT'
    console.log(`Server listening on port ${SERVER_PORT}`);
});