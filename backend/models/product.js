import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const productSchema = mongoose.Schema({
    product_name: { type: String, required: true, minLength: 5 },
    code: { type: String, unique: true, minLength: 5 },
    price: { type: Number, required: true },
    product_sizes: { type: [String], required: true, maxLength: 2 },
    product_colors: [String],
    product_images: [{
        data: Buffer,
        contentType: String
    }],
    product_gender: { type: String, required: true, maxLength: 1 },       // M, F, O, U
    brand: { type: String, required: true },
    category: { type: String, required: true },         // topwear, bottomwear, footwear
    subCategory: String,                                // formal, casual, sports, traditional
    subSubCategory: String, // shirt, tshirt, trouser, jeans, shorts, lower, jacket, hoodie, blazer, coat, shoes, socks, flipflop
    stock: { type: Number, required: true },
    rating: { type: Number, min: 1, max: 5 },
    // product_orders: Number,
    // product_returns: Number,

    review_id: String,
    order_id: String,
    return_id: String,

}, { timestamps: true } );

productSchema.plugin(uniqueValidator);

export default mongoose.model('product',productSchema);

