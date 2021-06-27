import { getCustomRepository } from 'typeorm'
import { CoplimentsRepositories } from '../repositories/ComplimentsRepositories'

class ListUserReceiveComplimentsService {

    async execute(user_id: string) {
        const complimentsRepositories = getCustomRepository(CoplimentsRepositories)

        const compliments = await complimentsRepositories.find({
            where: {
                user_receiver: user_id
            },
            relations: ["useSender", "useReceiver", "tag"]
        })

        return compliments
    }
}

export { ListUserReceiveComplimentsService }