import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

const returnSchema = mongoose.Schema({
    user_id: { type: String, required: true },              // pk
    product_id: { type: String, required: true },           // pk
    order_no: { type: Number, required: true },
    return_no: { type: Number, required: true },

    quantity: { type: Number, required: true },
    size: { type: String, required: true, maxLength: 2 },
    color: { type: String, required: true },

    reason: String,
    status: { type: String, required: true }      // approved, successful, canceled, pending, 
}, { timestamps: true } );

// productSchema.plugin(uniqueValidator);

export default mongoose.model('return',returnSchema);

