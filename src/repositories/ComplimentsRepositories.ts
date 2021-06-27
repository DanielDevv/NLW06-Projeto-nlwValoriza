import { EntityRepository, Repository } from "typeorm"
import { Compliment } from '../entities/Compliment'

@EntityRepository(Compliment)
class CoplimentsRepositories extends Repository<Compliment> {}

export { CoplimentsRepositories }