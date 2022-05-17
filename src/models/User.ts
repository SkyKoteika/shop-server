import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["username", "email"])
class User {
    @PrimaryColumn()
    username: string
    @Column()
    password: string
    @PrimaryColumn()
    email: string
    @Column({ default: false })
    isVeryfied: boolean
    @Column({ default: null })
    imageUrl: string
}

export default User;