var faker = require("faker");
var productArray = [];
var priceArray = [];

console.log("=====================\nWELCOME TO MY SHOP!\n=====================");

for (var i = 0; i < 10; i++){
    productArray.push(faker.commerce.productName());
    priceArray.push(faker.commerce.price());
}

for (var i = 0; i < 10; i++){
    console.log(productArray[i] + " - $" + priceArray[i]);
}