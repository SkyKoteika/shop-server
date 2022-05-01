import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
    @PrimaryColumn()
    username: string
    @Column()
    password: string
    @PrimaryColumn()
    email: string
    @Column()
    isVeryfied: boolean
    @Column()
    imageUrl: string
}

export default User;