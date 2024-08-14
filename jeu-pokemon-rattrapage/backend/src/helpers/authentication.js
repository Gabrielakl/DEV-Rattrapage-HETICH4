import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword;
}

const verifyPassword = async (inputPassword, storedPassword) => {
    const res = await bcrypt.compare(inputPassword, storedPassword);
    return res;
};

const generateToken = (user) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    return token;
}

export {
    hashPassword,
    verifyPassword,
    generateToken
}