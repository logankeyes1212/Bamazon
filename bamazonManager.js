var mysql = require("mysql");
var inquirer = require("inquirer");
let choices = [];
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});
// first connection for start 
connection.connect(function (err) {
    if (err) throw err;
    else {
        start();
    }
});
function start() {
    inquirer.prompt({
        name: "home",
        type: "rawlist",
        choices: ["View products for sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        message: "What would you like to do?"
    }).then(function (choice) {
        switch (choice.home) {
            case "View products for sale":
                forSale();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addList();
                break;
            case "Add New Product":
                addProduct();
                break;

        }
    });
};
// View products for sale function
function forSale() {
    var query = "SELECT * FROM products";
    // console.log(query)
    connection.query(query, function (err, res) {
        //    console.log(res) 
        if (err) throw err;
        // creating empty array for products
        // let choices = [];
        for (i = 0; i < res.length; i++) {
            choices.push({ id: res[i].id, product: res[i].product_name, price: "$" + res[i].price, department_name: res[i].department_name, stock_quantity: res[i].stock_quantity })
        } console.log(choices)
        restart();
    })
}
// restart function
function restart() {
    inquirer.prompt({
        name: "confirm",
        type: "confirm",
        message: "continue?",
        // default: true
    }).then(function (data) {
        if (data.confirm == false) {
            process.exit();
        }
        else {
            start();
        }
    });
}
//low inventory function
function lowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5;"
    connection.query(query, function (err, res) {
        if (err) throw err;
        // let choices = [];
        for (i = 0; i < res.length; i++) {
            choices.push({ id: res[i].id, product: res[i].product_name, stock_quantity: res[i].stock_quantity })
        }
        console.log(choices)
        restart();
    })
}
//list for updating inventory
function addList() {
    var query = "SELECT * FROM products";
    // console.log(query)
    connection.query(query, function (err, res) {
        //    console.log(res) 
        if (err) throw err;
        // creating empty array for products
        // let choices = [];
        for (i = 0; i < res.length; i++) {
            choices.push({ id: res[i].id, product: res[i].product_name, price: "$" + res[i].price, department_name: res[i].department_name, stock_quantity: res[i].stock_quantity })

        } console.log(choices)
        addInventory();
    });
}
function addInventory() {

    inquirer.prompt({
        name: "id",
        type: "input",
        message: "Please enter the ID number for the product you would like to add inventory to.",

    }).then(function (selected) {
        selected = parseInt(selected.id)
        console.log("you selected item #" + selected)
        // pulling items from sql
        var query = "SELECT * FROM products WHERE id =" + selected;

        connection.query(query, { id: selected }, function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                var product = res[i].product_name;
                var stock = res[i].stock_quantity;
                var department = res[i].department_name;
                var id = res[i].id;
                // console.log(product)
                console.log({
                    id: id,
                    product: product,
                    department: department,
                    stock_quantity: stock
                });
                quantity();
                function quantity() {
                    inquirer.prompt({
                        name: "stock_quantity",
                        type: "input",
                        message: "Please enter the number of units you would like to add to inventory "
                    }).then(function (data) {
                        data = parseInt(data.stock_quantity)
                        // calc total number added to inventory
                        console.log("You are adding " + data + " " + product + "s to the inventory. New stock total is " + (stock + data))
                        restart();
                        var query = "UPDATE products SET stock_quantity = (stock_quantity + " + data + ") WHERE id =" + selected;
                        connection.query(query, function (err, res) {
                            if (err) throw err;
                        });
                    })
                }
            }
        });
    })
}
function addProduct() {
    inquirer.prompt([
        {
            name: "product",
            type: "input",
            message: "Please enter the the product you would like to add to inventory"
        },
        {
            name: "department",
            type: "input",
            message: "Please enter the department you would like to add your product to"
        },
        {
            name: "cost",
            type: "input",
            message: "Please enter cost for your product"
        },
        {
            name: "amount",
            type: "input",
            message: "Please add inventory count here"
        }
    ]).then(function (selected) {
        addCost = selected.cost;
        addAmount = selected.amount;
        addDepartment = selected.department;
        addProduct = selected.product;
        console.log("You added " + addProduct + " to inventory");
        // pulling items from sql
        var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES('" + addProduct + "', '" + addDepartment + "', " + addCost + ", " + addAmount + ")";
        connection.query(query, function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                var product = res[i].product_name;
                var stock = res[i].stock_quantity;
                var department = res[i].department_name;
                var id = res[i].id;
                console.log(product)
                console.log({
                    id: id,
                    product: product,
                    department: department,
                    stock_quantity: stock
                });
            }
        }); forSale();
    })
}


