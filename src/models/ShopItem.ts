import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import Category from "./Category";

@Entity()
class ShopItem {
    @PrimaryGeneratedColumn()
    id: string
    @Column() title: string
    @Column() imageUrl: string
    @Column("decimal", { precision: 10, scale: 2 })
    price: number
    @Column() description?: string;
    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];
}

export default ShopItem;