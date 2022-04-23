import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
    @PrimaryColumn()
    username: string
    @Column()
    password: string
}

export default User;