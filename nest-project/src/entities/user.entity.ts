import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'usr' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  status: boolean;
}
