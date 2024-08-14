import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const getUserById = async (id) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        return user;
    } catch (error) {
        throw new Error(error);
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    } catch (error) {
        throw new Error(error);
    }
}

const addUser = async (user) => {
    try {
        const newUser = await prisma.user.create({ data: user });
        return newUser;
    } catch (error) {
      throw new Error(error);
    }
};

const updateUser = async (id, user) => {
    try {
        const updatedUser = await prisma.user.update({ where: { id }, data: user });
        return updatedUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const deleteUser = async (id) => {
    try {
        const deletedUser = await prisma.user.delete({ where: { id } });
        return deletedUser;
    } catch (error) {
        throw new Error(error);
    }
}

export {
    getUserById,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser
}