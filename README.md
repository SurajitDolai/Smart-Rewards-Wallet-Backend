# Wallet and Voucher Management Syatem
# Project Description
This is a backend wallet system built using Node.js, Express and MongoDB. Users can sign up, log in, add money  to their wallet, redeem money, and redeem vouchers using wallet balance.

# Tech Stack
-Node.js,
-Express.js,
-MongoDB,
-JWT Authentication,
-bcrypt,
-Postman,

# Folder Structure
- MVC Architecture (Model View Controller)
# Model
Userodel, 
WalletModel, 
VoucherModel, 
TransactionModel

# Controller
UserController, 
VoucherController, 
WalletController,

# Protect Start
npm install, 
npm start

# .env
PORT=5000
MONGO_URI=mongodb://localhost:27017/walletDB
JWT_SECRET=YOUR_SECRET_KEY

# API ENDPOINTS
----- USER APIS
/api/users/signup   ---sign up
/api/users/login    ---login

----- Wallet APIS
/api/users/wallet/add-money  ---wallet add money
/api/users/wallet/redeem-money  -- wallet redeem money
/api/users/wallet              ------wallet data and transaction history show

# Voucher APIS
/api/users/wallet/redeem-voucher  ---- wallet redeem Voucher


# postman collection
[text](<Wallet System.postman_collection.json>)  

# Architecture Diagram
![alt text](<Architecture Diagram/diagram.jpg>)

# Document
[text](Document/document.pdf)
