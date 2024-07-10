import { Router } from "express";
import { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } from "../controllers/userController.js";

import { isAuthenticatedUser, authorizeRole } from "../middleware/auth.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizeRole("admin"), getAllUser);
router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRole("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRole("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRole("admin"), deleteUser);

export default router;
