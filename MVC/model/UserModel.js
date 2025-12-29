const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
);

const walletSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
        default: 0,
    },
},
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model('User', userSchema);
const WalletModel = mongoose.model('Wallet', walletSchema);

module.exports = { UserModel, WalletModel };