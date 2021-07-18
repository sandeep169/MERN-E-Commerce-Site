import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const productSchema = mongoose.Schema({
    product_name: { type: String, required: true, minLength: 3 },
    code: { type: String, unique: true, required: true, minLength: 5 },
    price: { type: Number, required: true },
    product_sizes: { type: [String], required: true, maxLength: 2 },
    product_colors: { type: [String], required: true },
    product_gender: { type: String, required: true, maxLength: 1 },       // M, F, O, U

    product_images: [String],
    brand: String,
    category: String,       // topwear, bottomwear, footwear
    subCategory: String,    // formal, casual, sports, traditional
    subSubCategory: String, // shirt, tshirt, trouser, jeans, shorts, lower, jacket, hoodie, blazer, coat, shoes, socks, flipflop
    stock: { type: Number, default: 0 },
    rating: { type: Number, min: 1, max: 5 }       // admin defined rating

}, { timestamps: true } );

productSchema.plugin(uniqueValidator);

export default mongoose.model('product',productSchema);

