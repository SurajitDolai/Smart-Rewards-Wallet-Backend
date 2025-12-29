const { TransactionModel } = require("../model/Transaction");
const { WalletModel } = require("../model/UserModel");
const { VoucherModel } = require("../model/VoucherModel");

const redeemVoucher=async(req,res)=>{
    try {
        const {brand}=req.body;
        const user_id=req.user.user_id;

        const voucher=await VoucherModel.findOne({brand:brand,isActive:true});
        if(!voucher){
            return res.status(404).json({message:'Voucher not found or inactive'});
        }
        const wallet=await WalletModel.findOne({user_id:user_id});
        if(!wallet){
            return res.status(404).json({message:'Wallet not found'});
        }
        if(wallet.amount<voucher.value){
            return res.status(400).json({message:'Insufficient balance'});
        }   
        wallet.amount -=voucher.value;
        await wallet.save();
        await TransactionModel.create({
            user_id:user_id,
            wall_id:wallet._id,
            type:'DEBIT',
            amount:voucher.value
        });
        voucher.isActive=false;
        await voucher.save();
        res.status(200).json({message:'Voucher redeemed successfully',voucher:brand,remainingBalance:wallet.amount});   
    } catch (error) {
        res.status(500).json({message:'Error redeeming voucher',error:error.message});
    }
};

module.exports={redeemVoucher}