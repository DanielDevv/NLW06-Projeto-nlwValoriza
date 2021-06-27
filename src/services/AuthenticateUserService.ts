import { getCustomRepository } from "typeorm"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { UsersRepositories } from "../repositories/UsersRepositories"


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories)

        // Verificar se email existe

        const user = await usersRepositories.findOne({ email })

        if(!user) {
            throw new Error("Email/Password incorrect")
        }

        // verificar se senha está correta

        // vai comparar se a senha passada na req é igual a do bd que está criptografado
       const passwordMatch = await compare(password, user.password)

       if(!passwordMatch) {
            throw new Error("Email/Password incorrect")
        }

        // gerar token
        const token = sign({
            email: user.email
        }, "58981d7434b365a0e6cbe3f9e6a8a975", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token
    }
}

export { AuthenticateUserService }