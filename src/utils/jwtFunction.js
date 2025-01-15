import jwt from "jsonwebtoken";

export const JWT_SECRET = "s3cr3t";

export function generateToken(playload) {
    return jwt.sign(playload, JWT_SECRET, { expiresIn: "10m",});
}

export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}