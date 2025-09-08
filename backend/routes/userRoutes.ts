import express from "express"

import {
    createUser,
    loginUser,
    logoutCurrentUser,
    getAllUsers,
    getCurrentUserProfile,
    updateUserById,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById
} from "../controllers/userController.ts"
import { authenticate,authorizedAdmin } from "../middleware/authMiddleware.ts"


const router = express.Router();

router.post("/auth",loginUser)
router.post('/logout',logoutCurrentUser)

router
    .route("/")
    .post(createUser)
    .get(authenticate,authorizedAdmin,getAllUsers)


router
    .route("profile")
    .get(authenticate,getCurrentUserProfile)
    .put(authenticate,updateCurrentUserProfile)


router 
    .route("/:id")
    .delete(authenticate,authorizedAdmin,deleteUserById)
    .get(authenticate,authorizedAdmin,updateUserById)

export default router