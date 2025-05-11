import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: string;

  @Column()
  company: string;
  
  @Column()
  period: string;
  
  @Column('text')
  description: string;
  
  @Column({ default: 0 })
  order: number;
  
  @CreateDateColumn()
  createdAt: Date;
}