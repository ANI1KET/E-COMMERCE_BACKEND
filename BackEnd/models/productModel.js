import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"],
    },
    price: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Please Enter Product Category"],
    },
    Stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 Digits"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            reviewerId: {
                type: Schema.ObjectId,
                ref: "User",
                required: true,
            },
            reviewerName: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
                min: [0, 'Rating must be more than equal to 0'],
                max: [5, 'Rating must be less than equal to 5'],
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    CreatedUserId: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    CreatedUserName: {
        type: String,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model("Products", productSchema);
