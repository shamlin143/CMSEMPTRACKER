var mysql = require("mysql")
var inquirer = require("inquirer")
var consoletable = require("console.table")
const logo = require('asciiart-logo');
const config = require('./package.json');
console.log(logo(config).render());
const connection = mysql.createConnection({
  host:"localhost",
  port: 3306,
  user: "root",
  password: "Heidijosh143!",
  database: "CMSEMPTRACKER_db"
});
connection.connect(function(err){
  if(err) throw err;
  console.log(`connected as id + ${connection.threadId}`);
startRun();
});


function startRun() {
  inquirer
  .prompt({
     message: "What would you like to do?",
     type: "rawlist",
     name: "action",
     choices: [
      "View all Employees",
      "View roles",
      "View Departments", 
      "Add Employee", 
      "Add roles", 
      "Add Departments", 
      "Delete Employee", 
      "Update Employee Roles",
      "I am done"
    ]
   })
   .then(function(answer) {
     switch (answer.action) {
       case "View all Employees":
         employeeView();
         break;

       case "View roles":
          roleView();
          break;

       case "View Departments":
         departmentView();
         break; 

       case "Update Employee Role":
         updateEmployeeRole();
         break; 

      case "Add Employee":
        addEmployee();
        break;

      case "Add roles":
        addRole();
        break;

        case "Add Departments":
          addDepartment();
          break;

      case "Delete Employee":
        employeeView(); 
        deleteEmployee();
        break; 
        
      case "Delete Role":
        deleteRole();
        break;

      case "Delete Department":
        deleteDepartment();
        break;
         
       case "I am done":
        imDone(); 
        break; 

     }
    }
   )};

   function employeeView() {
   connection.query("SELECT id,first_name,last_name,role_id,manager_id FROM employee", function(err, res, fields) {
    if (err) throw err;
    console.log(res);
    startRun();
  });
}


function departmentView() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err;
    console.log(res);
    startRun();
  });
}

function roleView() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;
    console.log(res);
    startRun();
  })};

  // function to handle posting new employee
function addEmployee() {
  // prompt for info about the new employee
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "what is Employee id?",
      },
      {
        name: "first_name",
        type: "input",
        message: "What is employee first_name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is employee last_name?",
      },
      {
        name: "role_id",
        type: "input",
        message: "What is employee role_id?",
      },
      {
        name: "manager_id",
        type: "input",
        message: "What is employee manager_id?",
      }
      ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee (id,first_name,last_name,role_id,manager_id) VALUES (?,?,?,?,?)",[answer.id,answer.first_name,answer.last_name,answer.role_id,answer.manager_id],
      
        function(err) {
          if (err) throw err;
          console.log("Your employee was created successfully!");
          startRun();
      
        }
        )});
       };

          // function to handle posting new role
         function addRole() {
        // prompt for info about the new role
        inquirer
        .prompt([
        {
          name: "id",
          type: "input",
          message: "what is  id?",
        },
        {
          name: "title",
          type: "input",
          message: "What is title",
        },

        {
          name: "salary",
          type: "input",
          message: "What is role salary?",
        },
        {
          name: "department_id",
          type: "input",
          message: "What is department_id?",
        }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
 
          "INSERT INTO role (id,title,salary,department_id) VALUES (?,?,?,?)",[answer.id,answer.title,answer.salary,answer.department_id],

          function(err) {
            if (err) throw err;
            console.log("Your role was created successfully!");
            startRun();
        }
      );
       });}
  // function to handle posting new department
  function addDepartment() {
    // prompt for info about the new department
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "what is department_id?",
        },
        {
          name: "department_name",
          type: "input",
          message: "What is department_name?",
            
        }
      ])
        .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
          connection.query(
          "INSERT INTO department (id,department_iname) VALUES (?,?)",[answer.id,answer.department_name],
       
         function(err,res) {
           if (err) throw err;
             console.log("Your Department was Created");
             startRun();
            
       }
        )});
     }
        // function to handle deleting an employee
        function deleteEmployee() {
       // prompt for info about the employee to delete
        inquirer
        .prompt([
      {
        name: "id",
        type: "input",
        message: "what is Employee's id?",
      },
        ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "DELETE FROM employee WHERE id = ?",[answer.id],
          function(err,res) {
           if (err) throw err;
             console.log("Employee was deleted");
             startRun();
            
     }
      )});
      }

              // function to handle deleting an employee
              function deleterole() {
                // prompt for info about the employee to delete
                 inquirer
                 .prompt([
               {
                 name: "id",
                 type: "input",
                 message: "what is the role id?",
               },
                 ])
               .then(function(answer) {
                 // when finished prompting, insert a new item into the db with that info
                 connection.query(
                   "DELETE FROM role WHERE id = ?",[answer.id],
                   function(err,res) {
                    if (err) throw err;
                      console.log("role was deleted");
                      startRun();
                     
              }
               )});
               }

                       // function to handle deleting an employee
        function deleteDepartment() {
          // prompt for info about the employee to delete
           inquirer
           .prompt([
         {
           name: "id",
           type: "input",
           message: "what is Employee's id?",
         },
           ])
         .then(function(answer) {
           // when finished prompting, insert a new item into the db with that info
           connection.query(
             "DELETE FROM department WHERE id = ?",[answer.id],
             function(err,res) {
              if (err) throw err;
                console.log("department was deleted");
                startRun();
               
        }
         )});
         }
      function imDone() {
      console.log("Good BYE");
      connection.end();
   }
  
