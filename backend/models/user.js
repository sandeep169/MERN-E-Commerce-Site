import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = mongoose.Schema({
    username: { type: String, required: true, minLength: 4 },
    email: { type: String, required: true, unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        // [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']
    },
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

