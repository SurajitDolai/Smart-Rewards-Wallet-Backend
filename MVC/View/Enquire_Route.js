const express=require('express');
const { sign, login, } = require('../Controller/UserController');
const { auth } = require('../../Middleware/Auth');
const { redeemMoney, addMoney, getWalletDetails } = require('../Controller/WalletController');
const { redeemVoucher } = require('../Controller/VoucherController');
const Route=express.Router();


Route.post('/signup',sign);
Route.post('/login',login);
Route.post('/wallet/add-money',auth,addMoney);
Route.post('/wallet/redeem-money',auth,redeemMoney);
Route.post('/wallet/redeem-voucher',auth,redeemVoucher);
Route.get('/wallet',auth,getWalletDetails);
module.exports=Route;