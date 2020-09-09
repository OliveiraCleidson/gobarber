import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  ManyToOne, JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import {v4 as uuid} from 'uuid'

import User from './User';

@Entity('appointments')
class Appointment{
  @PrimaryColumn({length: 36})
  id: string = uuid();

  @ManyToOne(() => User, {onDelete: 'SET NULL', onUpdate: 'CASCADE'})
  @JoinColumn()
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  createAt:Date

  @UpdateDateColumn()
  updateAt:Date
}

export default Appointment
