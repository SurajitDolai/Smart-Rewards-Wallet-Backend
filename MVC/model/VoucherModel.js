const mongoose=require('mongoose');

const voucherSchema=new mongoose.Schema({   
    brand:{
        type:String,
        required:true,
        trim:true,
    },
    value:{
        type:Number,
        required:true,
        trim:true,
    },
    isActive:{
        type:Boolean,
        default:true,
    }
},
{
    timestamps: true,
});

const VoucherModel=mongoose.model('Voucher',voucherSchema);

module.exports={VoucherModel};

