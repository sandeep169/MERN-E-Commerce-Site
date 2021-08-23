import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

const returnSchema = mongoose.Schema({
    user_id: { type: String, required: true },              // pk
    product_id: { type: String, required: true },           // pk
    quantity: { type: Number, required: true },
    size: { type: String, required: true, maxLength: 2 },
    color: { type: String, required: true },
    reason: String
}, { timestamps: true } );

// productSchema.plugin(uniqueValidator);

export default mongoose.model('return',returnSchema);

