import { appDataSource } from "../../../database/data-source";
import { User } from "../../../database/entities/User";

export class MeService {
    async execute(userId: string) {
        const userRepository = appDataSource.getRepository(User)
        const user = await userRepository.findOne({where: {id: userId}})

        if(!user) {
            throw new Error("User not found")
        }

        return {
            user: {id: user.id, name: user.name, email: user.email}
        }
    }
}