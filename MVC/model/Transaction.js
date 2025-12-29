const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    wall_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['CREDIT', 'DEBIT'],
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
    }
},
    {
        timestamps: true,
    }
);
const TransactionModel = mongoose.model('Transaction', transactionSchema);

module.exports = { TransactionModel };
