import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userId: number;
    
    @Column({ unique: true, nullable: false, length: 11 })
    userCpf: string;

    @Column({ unique: true, nullable: false })
    userEmail: string;

    @Column({ unique: true, nullable: false })
    userPhone: string;
    
    @Column({ unique: true, nullable: false })
    userUser: string;

    @Column({ nullable: false })
    userName: string;

    @Column({ nullable: false })
    userPassword: string;

    constructor(userCpf: string, userEmail: string, userPhone: string, userUser: string, userName: string, userPassword: string) {
        this.userCpf = userCpf;
        this.userEmail = userEmail;
        this.userPhone = userPhone;
        this.userUser = userUser;
        this.userName = userName;
        this.userPassword = userPassword;
    }
}
