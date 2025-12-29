const mongoose = require('mongoose');

const redeemSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    voucher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher',
        required: true,
    },
    redeemAt: {
        type: Date,
        default: Date.now,
    },
    voucherValue: {
        type: Number,
        required: true,
    }
},
    {
        timestamps: true,
    }
);
const RedeemModel = mongoose.model('Redeem', redeemSchema);

module.exports = { RedeemModel };