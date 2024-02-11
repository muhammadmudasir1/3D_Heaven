import User from "../Models/User.js"
import createError from "http-errors"

export const CreateUserService = async (username, email, password, role,) => {
        const result = await User.create({ username, email, password, role })
        return result
}

export const getUserByEmail = async (Email) => {
        const result = await User.findOne({
                where: {
                        email: Email
                }
        })
        return result

}

export const getUserById = async (Id) => {
        const result = await User.findByPk(Id)
        return result
}

export const updateUser = async (Id, data) => {
        const result = await User.update(data, {
                where: { id: Id }
        })
        return result
}


export const getAllUsers = async () => {
        const result = await User.findAll({
                attributes: ['id', 'username', 'email', 'role']
        })
        return result
}

export const removeUser = async (Id) => {
        const user = await User.findAll({
                where: {
                        id: Id
                }
        })
        if (user.role == 1) {
                const totalSuperUser = await User.findAndCountAll({
                        where: {
                                role: 1
                        }
                })
                if (totalSuperUser.count === 1) {
                        throw createError.Unauthorized("invalid delete")
                }
        }


        const result = await User.destroy({
                where: {
                        id: Id
                }
        })
        return result
}