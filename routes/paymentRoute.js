import { Router } from "express";
import { processPayment, sendStripeApiKey } from "../controllers/paymentController.js";
const router = Router();
import { isAuthenticatedUser } from "../middleware/auth.js";

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

export default router;
