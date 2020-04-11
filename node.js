var mysql = require("mysql")
var inquirer = require("inquirer")
var consoletable = require("console.table")
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
      "Delete Employees", 
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

      case "Add Employee":
        addEmployee();
        break;

      case "Add roles":
        addRole();
        break;

        case "Add Departments":
          addDepartment();
          break;
         
       case "I am done":
        imDone(); 
        break; 

     }
    }
   )};

   function employeeView() {
  connection.query("SELECT * FROM employee", function(err, res) {
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

        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
      ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO employee ?",
        {
          id: answer.id,
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id
  },
        function(err) {
          if (err) throw err;
          console.log("Your employee was created successfully!");
          startRun();
        }
      );
    });
}

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
        {
          name: "salary",
          type: "input",
          message: "What is role salary?",
        },
        {
          name: "department_id",
          type: "input",
          message: "What is department_id?",
              
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
        ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO role ?",
          {
            id: answer.id,
            title: answer.name,
            salary: answer.salary,
            role_id: answer.role_id,
            department_id: answer.department_id
    },
          function(err) {
            if (err) throw err;
            console.log("Your role was created successfully!");
            startRun();
          }
        );
      });
  }

  // function to handle posting new department
  function addRole() {
    // prompt for info about the new department
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "what is  id?",
        },
        {
          name: "department_name",
          type: "input",
          message: "What is department_name?",
              
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
        ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO role ?",
          {
            id: answer.id,
            department_name: answer.department_name,

    },
          function(err) {
            if (err) throw err;
            console.log("Your department was created successfully!");
            startRun();
          }
        );
      });
  }

  function imDone() {
    console.log("Good BYE");
    connection.end();
  }


// async function getSelection(){
//   const selection = await inquirer.prompt(questions[0]);
//   console.log(selection);
//   switch (selection.action){
//     case "Employees":
//       displayItems();
//       const {Employee} = await inquirer.prompt(questions[1]);
//       console.log(Employee);
//   }}  
// function displayItems(){
//   connection.query("SELECT * FROM employee", function(err, res) {
//     if (err) throw err;
//     res.forEach(el => {
//       console.log(el.item)
//     });
//   });
// };
// function userbid(bid, bidItem){
//   connection.query("SELECT * FROM bids WHERE ?", 
//   {
//     item: bidItem
//   },
//     function(err, res) {
//     if (err) throw err;
//     console.log(res);
//     console.log(res[0].highestbid);
//     console.log(bid);
//     if (bid > res[0].highestbid){
//       let query = connection.query(
//         "update bids set ? where ?",
//         [
//           {
//             highestbid: bid
//           },
//           {
//             item: bidItem
//           }
//         ],
//         function(err, res) {
//           if (err) throw err;
//           console.log(res.affectedRows + " bid successful!\n");
//           // Call deleteProduct AFTER the UPDATE completes
//           connection.end();
//         }
//       ) 
//     } else {
//       console.log("Bid not high enough!")
//       getSelection();
//     };
//   });
// }
// function addItem(sellItem,startPrice){
//   const query = connection.query(
//     "Insert into bids set ?",
//     {
//       item: sellItem,
//       highestbid: startPrice
//     },
//     function(err,res) {
//       if (err) throw err;
//       console.log(res.affectedRows + " item inserted!\n");
//       displayItems();
//       connection.end();
//     }
//   )
// }
// getSelection();