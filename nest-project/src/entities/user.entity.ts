import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'usr' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  status: boolean;
}
