import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'
import { hash } from 'bcryptjs'

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {

    async execute({name, email, admin = false, password} : IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories) // O getCustomRepository vai ser responsável por instanciar

        if(!email) {
            throw new Error('Email incorrect')
        }

        const userAlreadyExists = await usersRepository.findOne({
            email
        })

        if(userAlreadyExists) {
            throw new Error('User already exists') // quando estamos lançando um erro, estamos passando o erro para a camada que irá chamar essa classe
        }

        const passwordHash = await hash(password, 8)

        const user = usersRepository.create({ // para salvar no repositorio
            name,
            email,
            admin,
            password: passwordHash
        })

        await usersRepository.save(user)

        return user
    }
}

export { CreateUserService }