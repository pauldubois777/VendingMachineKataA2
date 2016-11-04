# VendingMachineKataA2

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.16.

I wrote it to code the [Vending Machine Kata](https://github.com/guyroyse/vending-machine-kata)

## Design Phase

Before writing any code, I first outlined a high level design of the objects and how they will interact.  I also wrote some logic notes as I thought through various aspects.

Here are my design objects and notes:

### Product Model
* Description
* Cost

### Coin Enumeration
* Penny, Nickle, Dime, Quarter

### Inventory object - Holds the inventory of products in the machine
* Array of products with qty available
* Method to Dispense prodct - descreases qty of product by 1
* Method to Get Qty Available (product)

### Bank object - Holds the money in the machine
* Method to check if bank can make change. 
* Balance - Array of coins with qty of each coin in machine
* Method to return a monetary value from the bank.  This removes the appropriate coins from the bank balance, and send them to the Return object.
* Method to add coins to the bank.  Increases the Balance array of coins appropriately. 

### Retrun object - Represents the coin return area
* Balance - Array of coins with qty of each coin in the return area
* Method to increase coins gets an array of coins with qty of each coin
* Method to remove all sets balance array to empty

### Inserted Coins object - Represents coin insertion
* Coins Balance - Array of coins with qty of each coin that has been Inserted
* Value Balance - Observable that emits the value of the coins in the Coins Balance
* Method to Insert Coin - If invalid coin calls return object to place coin in return, otherwise increases Coins Balance array
* Method to Return All - Calls return object to place all of Coins Balance in return, and emptys Coins Balance
* Method to Purchase - Is called when user purchases product, gets the purchase price.  Calls Bank Object to add all coins that have been inserted.  Calls Bank object to have it return the excess money that was inserted above the purchase price.

### Product Buttons
* One button for each product in the Inventory Object
* Each button is wired to the Purchase Obect to intiaite purchase of itself

### Purchase Object
* Method to initiate the purchase.  
* If product qty avail is zero then calls Message Display object to display temp message "SOLD OUT"
* Get balance inserted from Inserted Coins object and compares to product cost.  
* If not enough, then calls Message Display object to display temp message "PRICE x.xx" where x.xx is the product price.  
* If enough, calls Inventory object to dispense product, and calls Message Display object to disply temp message "THANK YOU".

### Message Display Object
* Observes the Value Balance of the Inserted Coins object. (Or could make this a method and call it from Instered Coins object when appropriate)
* If not zero, then displays the balance.  
* If zero, checks the Bank Object to see if it can make change.  If it can, then display "INSERT COIN", otherwise display "EXACT CHANGE ONLY".
* Method to display temp messages - Save the current message. display the temp message text for 1 second, then restore the saved text. 


