import { Router } from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts } from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRole } from "../middleware/auth.js";

const router = Router();

router.route("/products")
    .get(getAllProducts);  // router.get("/products", getAllProducts);
router.route("/admin/product/new")
    .post(isAuthenticatedUser, authorizeRole("admin"), createProduct);
router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRole("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);
router.route("/product/:id")
    .get(getProductDetails);
router.route("/review")
    .put(isAuthenticatedUser, createProductReview);
router.route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);
router.route("/admin/products")
    .get(isAuthenticatedUser, authorizeRole("admin"), getAdminProducts);

export default router;
