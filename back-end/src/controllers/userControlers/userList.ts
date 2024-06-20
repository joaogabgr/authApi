import { Response, Request } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

const userRepository = AppDataSource.getRepository(User);

export default function userList(req: Request , res: Response) {
    try {
        const users = userRepository.find();
        res.status(200).send({ success: users});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}