// Middleware de validación utilizando Joi
export function validate(dto) {
    return (req, res, next) => {
        // Validación del cuerpo de la solicitud contra el esquema DTO
        const { error } = dto.validate(req.body);

        // Si hay un error de validación, se responde con un estado 400 y el mensaje de error
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }

        // Si no hay errores, se pasa al siguiente middleware o controlador
        next();
    };
}