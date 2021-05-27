import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
    username: { type: String, required: true, minLength: 5 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
    phone: { type: Number, minLength: 10, maxLength: 10 },
    gender: { type: String, minLength: 1, maxLength: 1 },       // M, F, O
    age: { type: Number, min: 10, max: 99 },
    ownership: { type: String, default: 'user' },

    cart_id: String,
    order_id: String,
    return_id: String,
    review_id: String,

}, { timestamps: true } );

userSchema.plugin(uniqueValidator);

export default mongoose.model('user',userSchema);

