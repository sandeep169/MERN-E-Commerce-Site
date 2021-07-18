import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const returnSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    productCustomization_id: { type: String, required: true, unique: true },

    reason: { type: String, required: true, maxLength: 250 },      // predefined(chosen by user only from given reasons), user-defined
    return_status: { type: String, default: 'pending' }     // approved, successful, canceled, pending,

}, { timestamps: true } );

returnSchema.plugin(uniqueValidator);

export default mongoose.model('return',returnSchema);

