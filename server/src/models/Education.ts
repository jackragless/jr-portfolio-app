import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  degree: string;

  @Column()
  institution: string;
  
  @Column()
  period: string;
  
  @Column('text')
  description: string;
  
  @Column({ default: 0 })
  order: number;
  
  @CreateDateColumn()
  createdAt: Date;
}