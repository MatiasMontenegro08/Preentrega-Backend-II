// Importación de la función para verificar tokens JWT
import { verifyToken } from "../utils/jwtFunction.js";

// Middleware para autenticar usuarios a través del encabezado de autorización
export function authenticateHeader(req, res, next) {
    const headers = req.headers.authorization;

    // Verificación de la existencia del encabezado de autorización
    if (!headers) {
        return res.status(401).json({
            error: "No hay sesión iniciada - Falta encabezado de autorización",
        });
    }

    const token = headers.split(" ")[1];

    // Verificación de la existencia del token en el encabezado
    if (!token) {
        return res.status(401).json({
            error: "No hay sesión iniciada - Token no encontrado en encabezado",
        });
    }

    try {
        const decoded = verifyToken(token);

        // Asignación del usuario decodificado al objeto de solicitud
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            error: "Token inválido o expirado",
        });
    }
}

// Middleware para autenticar usuarios a través de cookies
export function authenticateCookie(req, res, next) {
    const token = req.cookies.currentUser;

    // Verificación de la existencia del token en la cookie
    if (!token) {
        return res.status(401).json({
            error: "No hay sesión iniciada - Falta token en cookie",
        });
    }

    try {
        const decoded = verifyToken(token);

        // Asignación del usuario decodificado al objeto de solicitud
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            error: "Token inválido o expirado",
        });
    }
}

// Middleware para autorizar usuarios basados en roles
export function authorize(roles) {
    return (req, res, next) => {
        // Verificación de que el rol del usuario está incluido en los roles permitidos
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                error: "No tienes permisos para acceder a esta ruta",
            });
        }
        next();
    };
}