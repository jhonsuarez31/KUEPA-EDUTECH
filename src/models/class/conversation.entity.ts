import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { Message } from './mesagge.entity';


@Entity({ name: 'conversations' })
export class Conversacion {
  @PrimaryGeneratedColumn('uuid')
  id_conversacion: string;


  @Column({ nullable: true, default: null })
  nombre: string;


  @OneToMany(() => Message, message => message.conversation)
  messages: Message[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ nullable: false, default: 'abierta' })
  status: string;
}
