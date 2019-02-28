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
        // creating empty array for products
        let choices = [];
        for (i = 0; i < res.length; i++) {
            choices.push({ id: res[i].id, product: res[i].product_name, price: "$" + res[i].price })

        } console.log(choices)
        itemToBuy();

    })
}
// items to buy function
function itemToBuy() {

    inquirer.prompt({
        name: "id",
        type: "input",
        message: "Please enter the ID number for the product you would like to buy",

    }).then(function (selected) {
        selected = parseInt(selected.id)
        console.log("you selected item #" + selected)
        // pulling items from sql
        var query = "SELECT * FROM products WHERE id =" + selected;

        connection.query(query, { id: selected }, function (err, res) {
            //    if(err) throw err;
            for (var i = 0; i < res.length; i++) {
                // res.push({ id: res[i].id, product: res[i].product_name, department: res[i].department_name })
                var product = res[i].product_name;
                var stock = res[i].stock_quantity;
                console.log(product)
                console.log({
                    id: res[i].id,
                    product: res[i].product_name,
                    department: res[i].department_name,
                    stock_quantity: res[i].stock_quantity
                })
                    quantity();
               
                function quantity() {
                    if (stock >= 1 ){
                    inquirer.prompt({
                        name: "stock_quantity",
                        type: "input",
                        message: "Please enter the quantity you would like to buy"
                    }).then(function (data) {
                        data = parseInt(data.stock_quantity)
                        console.log(stock)
                        console.log("you are buying " + data + " " + product + "s")
                        var query = "UPDATE products SET stock_quantity = (stock_quantity - " + data + ") WHERE id =" + selected;
                        // console.log(query)
                        connection.query(query, function (err, res) {
                           
                            // if (data.stock_quantity === 0)
                            // console.log("there is not enough" + product + "s left")
                        
                        })
                    })
                }else console.log("there is not enough "+ product +"s in our inventory")
                }
            }
        })
    });
}
// function quantity() {
//     inquirer.prompt({
//         name: "stock_quantity",
//         type: "input",
//         message: "Please enter the quantity you would like to buy"
//     }).then(function (data) {
//         data = parseInt(data.stock_quantity)
//         console.log(data)
//         var query = "UPDATE products SET stock_quantity = (stock_quantity - "+data+"where id ="
//         connection.query(query)
//     })
// }
