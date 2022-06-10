import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
class SaleSlider {
    @PrimaryGeneratedColumn()
    index: number
    @Column()
    imageUrl: string
}

export default SaleSlider;