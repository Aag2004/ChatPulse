import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js"
// import { protectRoute } from "../middleware/auth.middleware.js";
import User from "../models/user.model.js";
const router = express.Router()

router.get("/test-user/:id", async (req, res) => {
    try {
        console.log("Fetching User with ID:", req.params.id);
        const user = await User.findById(req.params.id).select("-password");
        console.log("User Found:", user);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Error fetching user" });
    }
});


router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.put("/update-profile",protectRoute, updateProfile)

router.get("/check", protectRoute, checkAuth)

// router.get("/check", (req, res) => {
//     res.json({ message: "Check route is working!" });
// });
export default router;  