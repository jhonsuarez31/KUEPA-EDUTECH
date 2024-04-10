import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'rol'})
export class Rol {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({type:'varchar', width:100})
    rol:string


    @BeforeInsert()
    rolUppercase() {
        this.rol = this.rol.toUpperCase();
    }
}