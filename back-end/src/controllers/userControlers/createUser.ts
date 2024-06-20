import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import bcrypt from "bcrypt";
import verifyCpf from "../../middlewares/verifyCPF";

const userRepository = AppDataSource.getRepository(User);

export default async function createUser(req: Request, res: Response) {
    try {
        const { userCpf, userEmail, userPhone, userUser, userName, userPassword, userPasswordVerify } = req.body;
        
        if (userPassword !== userPasswordVerify) {
            return res.status(400).json({ error: "Senhas não conferem" });
        }

        if (verifyCpf(userCpf) === false) {
            return res.status(400).json({ error: "CPF inválido" });
        }

        const existingUser = await userRepository.findOne({
            where: [
                { userCpf: userCpf },
                { userEmail: userEmail },
                { userPhone: userPhone },
                { userUser: userUser }
            ]
        });

        if (existingUser) {
            if (existingUser.userEmail === userEmail) {
                return res.status(400).json({ error: "Email já cadastrado" });
            } else if (existingUser.userPhone === userPhone) {
                return res.status(400).json({ error: "Telefone já cadastrado" });
            } else if (existingUser.userUser === userUser) {
                return res.status(400).json({ error: "Usuário já cadastrado" });
            } else if (existingUser.userCpf === userCpf) {
                return res.status(400).json({ error: "CPF já cadastrado" });
            }
        }

        const cryptPassword = bcrypt.hashSync(userPassword, 10);

        const user = new User(userCpf, userEmail, userPhone, userUser, userName, cryptPassword);
        
        await userRepository.save(user);

        res.status(201).json({ success: "Usuário criado com sucesso" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
}
