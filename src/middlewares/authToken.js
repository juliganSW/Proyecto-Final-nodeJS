//Importacion jsonwebtoken para validar con JWT
import jwt from "jsonwebtoken";

/***Middleware de autenticación con Token***/
   
//Un middleware se ejecuta antes de que se ejecute la ruta final 
export const authToken = (req, res, next) => {

    //Obtengo el header Authorization
    const authHeader = req.headers.authorization;

    //Si no se envía el token, se bloquea el acceso
    if (!authHeader) {
        return res.status(401).json({
            msg: "Token requerido"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        //Verificacion de token (que sea válido y que no haya expirado)
       
        jwt.verify(token, process.env.JWT_SECRET);

        //next() permite continuar hacia la ruta protegida
        next();
    } catch (err) {
        
        return res.status(401).json({
            msg: "Token inválido o expirado"
        });
    }
};
