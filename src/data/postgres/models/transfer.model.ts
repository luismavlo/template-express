


import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Transfer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float', {
    nullable: false,
  })
  amount: number;

  @Column('int', {
    nullable: false,
  })
  senderUserId: number;

  @Column('int', {
    nullable: false,
  })
  receiverUserId: number;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}