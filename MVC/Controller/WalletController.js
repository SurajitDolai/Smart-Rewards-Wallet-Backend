const { TransactionModel } = require("../model/Transaction");
const { WalletModel } = require("../model/UserModel");

const addMoney=async(req,res)=>{
  try {
      const {amount}=req.body;
      const user_id=req.user.user_id;

      if(!amount||amount<=0){
        return res.status(400).json({message:'Invalid Amount'});
      }

      const wallet=await WalletModel.findOne({user_id:user_id});

      if(!wallet){
        return res.status(404).json({message:'Wallet Not found'});
      }
      wallet.amount +=amount;
      await wallet.save();

      await TransactionModel.create({
        user_id:user_id,
        wall_id:wallet._id,
        type:'CREDIT',
        amount:amount
      });
    res.status(200).json({message:'Amount added successfully',amount:wallet.amount});
    
  } catch (error) {
    res.status(500).json({message:'Error adding money',error:error.message});  
  }
};

const redeemMoney=async(req,res)=>{
    try {
        const {amount}=req.body;
        const user_id=req.user.user_id;
        if(!amount||amount<=0){
          return res.status(400).json({message:'Invalid Amount'});
        }
        const wallet=await WalletModel.findOne({user_id:user_id});
        if(!wallet){
          return res.status(404).json({message:'Wallet Not found'});
        }   
        if(wallet.amount<amount){
          return res.status(400).json({message:'Insufficient Balance'});
        }
        wallet.amount -=amount;
        await wallet.save();
        await TransactionModel.create({ 
            user_id:user_id,
            wall_id:wallet._id,
            type:'DEBIT',
            amount:amount
        });
      res.status(200).json({message:'Amount redeemed successfully',amount:wallet.amount});

    } catch (error) {
        res.status(500).json({message:'Error redeeming money',error:error.message});
    }
};

const getWalletDetails=async(req,res)=>{
    try {
        let creadit=0;
        let debit=0;
        const user_id=req.user.user_id;
        const wallet=await WalletModel.findOne({user_id:user_id});
        if(!wallet){
            return res.status(404).json({message:'Wallet not found'});
        }
        const transaction=await TransactionModel.find({user_id:user_id}).sort({createdAt:-1});
        if(!transaction){
            return res.status(404).json({message:'No transactions found'});
        }
        transaction.forEach((ts)=>{
            if(ts.type=='CREDIT') creadit+=ts.amount;
            if(ts.type=='DEBIT') debit+=ts.amount;
        })
        return res.status(200).json({message:'Wallet details fetched successfully',TotalBalance:wallet.amount,TotalCredit:creadit,TotalDebit:debit,transaction});
    } catch (error) {
        res.status(500).json({message:'Error fetching wallet details',error:error.message});
    }
};

module.exports={addMoney,redeemMoney,getWalletDetails};