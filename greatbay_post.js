var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your passwordßßß
  password: "rootRoot",
  database: "greatbayDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  postProduct();
});

inquirer.prompt([
  {
    type: "input",
    name: "product",
    message: "What is your product?"
  },
  {
    type: "input",
    message: "How much does this product cost?",
    name: "price",
  },
  {
    type: "input",
    message: "How many of these products are you selling?",
    name: "quantity",
  },
]).then(function(data) {

  var filename = data.name.toLowerCase().split(' ').join('') + ".json";

  fs.writeFile(filename, JSON.stringify(data, null, '\t'), function(err) {

    if (err) {
      return console.log(err);
    }

    console.log("Product input successfully gathered!");

  });
});

function postProduct() {
  console.log("Posting a new product...\n");
  var query = connection.query(
    "INSERT INTO products SET ?",
    {
      product: "Trinket",
      price: 3.0,
      quantity: 1
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      updateProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function updateProduct() {
  console.log("Updating all trinket quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        quantity: 1
      },
      {
        product: "Trinket"
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteProduct() {
  console.log("Deleting all ...\n");
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      product: "bracelet"
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " product deleted!\n");
      // Call readProducts AFTER the DELETE completes
      readProducts();
    }
  );
}

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}