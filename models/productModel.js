const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a product name"]
        },
        description: {
            type: String,
            required: [true, "Please enter a description"]
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: [true, "Please enter if it is Male, Women, or teens"]
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model ('Product', productSchema);

module.exports = Product;
