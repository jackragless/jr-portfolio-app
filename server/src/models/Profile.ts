import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;
  
  @Column('text')
  bio: string;
  
  @Column('text')
  bioExtended: string;
  
  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  location: string;
  
  @Column({ nullable: true })
  locationUrl: string;
  
  @Column({ nullable: true })
  githubUrl: string;
  
  @Column({ nullable: true })
  linkedinUrl: string;
  
  @Column({ nullable: true })
  discordUrl: string;
  
  @Column({ nullable: true })
  email: string;
  
  @CreateDateColumn()
  createdAt: Date;
}