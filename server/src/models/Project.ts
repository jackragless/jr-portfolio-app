import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('simple-array')
  technologies: string[];

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  projectUrl: string;

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ default: false })
  featured: boolean;

  @CreateDateColumn()
  createdAt: Date;
}