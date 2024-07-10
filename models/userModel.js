import { Schema, model } from "mongoose";
import { randomBytes, createHash } from "crypto";

import jsonwebtokenpkg from 'jsonwebtoken';
const { sign } = jsonwebtokenpkg;
import bcryptjspkg from 'bcryptjs';
const { hash, compare } = bcryptjspkg;
import validatorpkg from 'validator';
const { isEmail } = validatorpkg;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    // avatar: {
    //     public_id: {
    //         type: String,
    //         required: true,
    //     },
    //     url: {
    //         type: String,
    //         required: true,
    //     },
    // },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
    return sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

userSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = randomBytes(20).toString("hex");
    this.resetPasswordToken = createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
};

export default model("User", userSchema);
