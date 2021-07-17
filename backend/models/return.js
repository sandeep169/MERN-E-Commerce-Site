import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const returnSchema = mongoose.Schema({
    user_id: { type: String, required: true },              // pk
    productCustomization_id: { type: String, required: true, unique: true },
    /*product_id: { type: String, required: true },           // pk
    order_no: { type: Number, required: true },
    return_no: { type: Number, required: true },

    quantity: { type: Number, required: true },
    size: { type: String, required: true, maxLength: 2 },
    color: { type: String, required: true },*/

    // reason: String,
    reason: { type: String, required: true, maxLength: 250 },      // predefined(chosen by user only from given reasons), user-defined
    // return_status: { type: String, required: true }      // approved, successful, canceled, pending,
    return_status: { type: String, default: 'pending' },
}, { timestamps: true } );

returnSchema.plugin(uniqueValidator);

export default mongoose.model('return',returnSchema);

