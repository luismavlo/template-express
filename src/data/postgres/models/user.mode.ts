


import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { bcryptAdapter } from '../../../config/bcrypt.adapter';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 100,
    nullable: false,
  })
  fullname: string;

  @Column('varchar', {
    length: 20,
    nullable: false,
  })
  accountNumber: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  password: string;

  @Column('float', {
    nullable: false,
  })
  amount: number;

  @Column('boolean', {
    nullable: false,
    default: true
  })
  status: boolean;

  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  encryptedPassword(){
    this.password = bcryptAdapter.hash(this.password)
  }
}