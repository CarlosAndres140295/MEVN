import express from "express";
import { body } from "express-validator";
import { login, register, infoUser, refreshToken, logout } from "../controllers/auth.controller.js";
import { validatorExpress } from "../middlewares/validatorExpress.js";

const router = express.Router();

router.post("/register",[
        body("email", "Ingrese un Email valido").trim().isEmail().normalizeEmail(),
        body("password", "La contraseña debe tener minimo 5 caracteres").trim().isLength({min:5})
    ],
    validatorExpress,
    register);

router.post("/login",[
    body("email", "Ingrese un Email valido").trim().isEmail().normalizeEmail(),
    body("password", "La contraseña debe tener minimo 5 caracteres").trim().isLength({min:5})
    ],
    validatorExpress,
    login);


// router.get("/protected", validateToken, infoUser);
// router.get("/refresh", refreshToken);
// router.get("/logout", logout);

export default router;