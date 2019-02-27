var mysql = require("mysql");
var inquirer = require("inquirer");

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
    else start();
});

// function search(){
//     inquirer.prompt({
//         name: "start",
//         type: "rawlist",
//         message: "choose your department",
//         choices: ["electronics", "clothing", "travel gear", "school goods"]

//     })
// }
function start() {
    var query = "SELECT * FROM products";
    // console.log(query)
    connection.query(query, function (err, res) {
        //    console.log(res) 

        let choices = [];
        for (i = 0; i < res.length; i++) {
            choices.push({ id: res[i].id, product: res[i].product_name, price: "$" + res[i].price })

        } console.log(choices)
        itemToBuy();

    })
}

function itemToBuy() {

    inquirer.prompt({
        name: "id",
        type: "input",
        message: "Please enter the ID number for the product you would like to buy",

    }).then(function (selected) {
        selected = parseInt(selected.id)
        console.log(selected)
        var query = "SELECT * FROM products WHERE id =" + selected;
        connection.query(query, { id: selected }, function (err, res) {
            //    if(err) throw err;
            for (var i = 0; i < res.length; i++) {
                // res.push({ id: res[i].id, product: res[i].product_name, department: res[i].department_name })

                console.log({
                           id: res[i].id,
                      product: res[i].product_name,
                   department: res[i].department_name
                })
                quantity();
            }
        })
    });
}
// function quantity() {
//     inquirer.prompt({
//         name: "stock_quantity",
//         type: "input",
//         message: "Please enter the quantity you would like to buy"
//     }).then(function (selected) {
//         selected = parseInt(selected.stock_quantity)
//         console.log(selected)
//         var query = "UPDATE products SET stock_quantity = (stock_quantity - "+selected+"where id ="
//         connection.query(query)
//     })
// }
UPDATE products
SET stock_quantity = (stock_quantity - 1) 
WHERE Id = 11;