import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

export default async function validateToken(req: Request, res: Response) {
    try {
        const validateToken = req.body.token;
        const decoded = jwt.verify(validateToken, process.env.SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Token inválido" });
        }

        const user = await userRepository.findOne({ where: { userId: decoded.userId } });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        
        const token = jwt.sign({ userId: user.userId }, process.env.SECRET, {'expiresIn': '1h'});
        return res.status(200).json({ success: { user, token } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao validar token" });
    }
}