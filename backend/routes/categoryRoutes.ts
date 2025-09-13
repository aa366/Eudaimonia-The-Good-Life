import express from "express"
import { authenticate,authorizedAdmin } from "../middleware/authMiddleware.ts"
import { createCategory, listCategory, readCategory, removeCategory, updateCategory } from "../controllers/categoryController.ts"



const router = express.Router()

router.route("/").post(authenticate,authorizedAdmin,createCategory)
router
    .route("/:categoryId")
     .put(authenticate,authorizedAdmin,updateCategory)
     .delete(authenticate,authorizedAdmin,removeCategory)

router.route("/categories").get(listCategory)
router.route("/:id").get(readCategory)


export default router