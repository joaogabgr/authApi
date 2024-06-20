import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { Request, Response } from "express";

const userRepository = AppDataSource.getRepository(User);

export default async function userProfile(req: Request, res: Response) {
    try {
        const userId = Number(req.params.id);
        const user = await userRepository.find({ where: { userId: userId } });

        if (user.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        return res.status(200).json({ success: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao buscar usuário" });
    }
}