import bcrypt from "bcrypt";

export async function createHash(password) {
    return await bcrypt.hash(password, bcrypt.genSaltSync(10));
}

export async function verifyPassword(password, hashedPassword){
    return await bcrypt.compare(password, hashedPassword);
}