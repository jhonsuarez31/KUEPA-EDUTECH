import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Rol } from './rol.entity';


@Entity({name:'users'})
export class User {

  @PrimaryGeneratedColumn('uuid', {name:'user_id',})
  id: string;

  @Column({nullable:false, name:'first_name'})
  firstName: string;

  @Column({nullable:false, name:'last_name'})
  lastName: string;

  @Column({nullable:false, unique:true})
  email: string;

  @Column({nullable:false, unique:true})
  password: string;

  @CreateDateColumn()
  create_at:Date

  @UpdateDateColumn()
  update_at:Date


  
  @ManyToOne(() => Rol, { eager: true, nullable:false })
  @JoinColumn({ name: 'rol_id' })
  rol: Rol

  
  @BeforeInsert() 
  genarate(){ 
      this.id = uuid()
  }
}
