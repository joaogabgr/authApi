import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export default async function loginUser(req: Request, res: Response) {
    try {
        const { userUser, userPassword } = req.body;

        const user = await userRepository.findOne({
            where: [
                { userUser: userUser },
                { userCpf: userUser },
            ]
        });

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        if (!bcrypt.compareSync(userPassword, user.userPassword)) {
            return res.status(401).json({ error: "Senha inválida" });
        }

        const token = jwt.sign({ userId: user.userId }, process.env.SECRET, {
            expiresIn: "1h"
        });

        return res.status(200).json({ success: {user, token} });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao logar usuário" });
    }
}


