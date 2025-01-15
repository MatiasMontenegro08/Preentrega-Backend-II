import { verifyToken } from "../utils/jwtFunction.js";

// Autenticación basada en encabezados
export function authenticateHeader(req, res, next) {
    const headers = req.headers.authorization;

    if (!headers) {
        return res.status(401).json({
            error: "No hay sesión iniciada - Falta encabezado de autorización",
        });
    }

    const token = headers.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            error: "No hay sesión iniciada - Token no encontrado en encabezado",
        });
    }

    try {
        const decoded = verifyToken(token);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            error: "Token inválido o expirado",
        });
    }
}

// Autenticación basada en cookies
export function authenticateCookie(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            error: "No hay sesión iniciada - Falta token en cookie",
        });
    }

    try {
        const decoded = verifyToken(token);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            error: "Token inválido o expirado",
        });
    }
}

// Autenticación basada en roles
export function authorize(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: "No tienes permisos para acceder a esta ruta",
            });
        }
        next();
    };  
};