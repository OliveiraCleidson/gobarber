import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import {v4 as uuid} from 'uuid'

@Entity('appointments')
class Appointment{
  @PrimaryColumn({length: 36})
  id: string = uuid();

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment