import { Router } from "express";
import authController from "../controllers/auth.controller.js"
import { Autharization } from "../middlewares/auth.middlewares.js";
let route = Router()

route.post("/register", authController.REGISTER)
route.post("/login", authController.LOGIN)
route.get("/profile", Autharization, authController.PROFILE)

export default route