import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Conversacion } from './conversation.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'mesagges' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id_message: string;


  @Column()
  text: string;
  
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;


  @ManyToOne(() => Conversacion, { onDelete: 'NO ACTION', nullable: false, eager: false })
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversacion;


  @ManyToOne(() => User, { onDelete: 'NO ACTION', nullable: false, eager: true })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  
}
