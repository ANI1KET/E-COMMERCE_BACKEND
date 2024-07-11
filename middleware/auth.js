import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHander from "../utils/errorhander.js";
import { verify } from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies; // const token = req.cookies.token;
    // const token = req.cookies; // Returns Object

    if (!token) {
        return next(new ErrorHander("Please Login to access all resource", 401));
    }

    const decodedData = verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

// exports.authorizeRole = (...roles) => {
export function authorizeRole(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHander(
                    `Role: ${req.user.role} is not allowed to access this resouce `, 403)
            );
        }
        next();
    };
}
