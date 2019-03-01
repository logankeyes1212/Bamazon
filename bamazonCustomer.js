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

function start() {
    var query = "SELECT * FROM products";
    // console.log(query)
    connection.query(query, function (err, res) {
        //    console.log(res) 
        if (err)throw err;
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
               if(err) throw err;
            for (var i = 0; i < res.length; i++) {
                // res.push({ id: res[i].id, product: res[i].product_name, department: res[i].department_name })
                var product = res[i].product_name;
                var stock = res[i].stock_quantity;
                var cost = res[i].price;
                var department = res[i].department_name;
                var id = res[i].id;
                // console.log(product)
                console.log({
                    id: id,
                    product: product,
                    department: department,
                    stock_quantity: stock
                })
                quantity();
                function quantity() {
                    // if for if there is not enough in the stock
                    if (stock >= 1) {
                        inquirer.prompt({
                            name: "stock_quantity",
                            type: "input",
                            message: "Please enter the number of units you would like to buy"
                        }).then(function (data) {
                            data = parseInt(data.stock_quantity)
                            // console.log(stock)
                            // if statement for if the choose to much of an item
                            if (data <= stock) {
                                // calc total for total price cust owes
                                total = data * cost
                                console.log("You are buying " + data + " " + product + "s")
                                console.log("Your total is $" + total)
                                endStart();
                                var query = "UPDATE products SET stock_quantity = (stock_quantity - " + data + ") WHERE id =" + selected;
                                // console.log(query)
                                
                                connection.query(query, function (err, res) {
                                    if (err) throw err;
                                 });
                                 //end program or restart
                                 
                            } else {console.log("Sorry there is not enough " + product + "s in our inventory please select a lower quantity or try again later")
                           //end program
                            endStart();}
                        })
                    } else{ console.log("Sorry we are out of " + product + "s")
                    endStart();}
                }
            }
        })
    });
}
//end or continue shopping function
function endStart(){
    inquirer.prompt({
       name: "confirm",
       type: "confirm",
       message: "continue shopping?",
       // default: true
   }).then(function (data) {
       if (data.confirm === false)
      
       process.exit();
    else 
       start();
   });
}
