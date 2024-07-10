import { Router } from "express";
import { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } from "../controllers/orderController.js";

const router = Router();
import { isAuthenticatedUser, authorizeRole } from "../middleware/auth.js";

router.route("/order/new")
    .post(isAuthenticatedUser, newOrder);
router.route("/order/:id")
    .get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me")
    .get(isAuthenticatedUser, myOrders);
router.route("/admin/orders")
    .get(isAuthenticatedUser, authorizeRole("admin"), getAllOrders);
router.route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeRole("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRole("admin"), deleteOrder);

export default router;
