import { validationResult } from "express-validator";
import { body } from "express-validator";


export const validarParametos = () => {
    // console.log(req.body);
        [
        body("email", "Ingrese un Email valido").trim().isEmail().normalizeEmail(),
        body("password", "La contraseña debe tener minimo 5 caracteres").trim().isLength({min:5})
    ]
    // next();
}
export const validatorExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    next();
};