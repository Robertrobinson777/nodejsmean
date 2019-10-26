const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        first: { type:String , required: true }, 
        last: { type:String , required: true }
    },    
    email: { 
        id: { type: String, unique: true, required: true },
        _v: { type: Boolean, default: false },
    },
    mobile: {
        no: { type: String, unique: true, required: true },
        _v: { type: Boolean, default: false },
    },
    password: { type: String, required: true },
//    createdDate: { type: Date, required: true, default: Date.now },
    dp: Schema.Types.Mixed,    
//    hash: { type: String, unique: true, required: true },
    time: {
        login: Date,
        logout: Date,
        signup: Date,
        verify: Date,
    },
    passchange: {
        status: Boolean,
        code: String,
        time: Schema.Types.Mixed
    },
    dob: { date: Number, month: Number, year: Number},
    gender: String,
    address: {
        address: String,
        landmark: String,
        city: String,
        state: String,
        pincode: String
    },
    role: String   
},{collection:"users"});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('users', schema);