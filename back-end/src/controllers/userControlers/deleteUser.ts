import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { Request, Response } from "express";	

const userRepository = AppDataSource.getRepository(User);

export default async function deleteUser(req: Request, res: Response) {
    try {
        const userId = Number(req.params.id);
        const user = await userRepository.find({ where: { userId: userId } });

        if (user.length === 0) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        await userRepository.delete({ userId: userId });
        res.status(200).json({ success: "Usuário deletado com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar usuário" });
    }
}