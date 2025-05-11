import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Technology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column({ default: 0 })
  order: number;
  
  @Column({ nullable: true })
  icon: string;
  
  @Column({ nullable: true })
  imageUrl: string;
  
  @Column({ nullable: true })
  url: string;
  
  @CreateDateColumn()
  createdAt: Date;
}