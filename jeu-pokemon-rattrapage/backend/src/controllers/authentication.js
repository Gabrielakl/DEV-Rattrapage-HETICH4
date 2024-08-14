import { HTTP_STATUS_CODE } from "../constants/http.js";
import { getUserByEmail } from "../repositories/user.js";
import * as authHelpers from "../helpers/authentication.js";

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send("Username and password are required");
    };

    const user = await getUserByEmail(email);
    if(!user) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).send("User does not exist");
    }

    const passwordIsValid = await authHelpers.verifyPassword(password, user.password);
    if (!passwordIsValid) {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).send("Invalid password");
    };

    const token = authHelpers.generateToken(user);
    res.status(HTTP_STATUS_CODE.OK).send({ token });
};

export {
    login
};