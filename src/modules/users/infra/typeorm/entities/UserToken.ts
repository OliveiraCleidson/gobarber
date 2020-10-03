import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users_token')
class UserToken {
  @PrimaryColumn({ length: 36 })
  id: string = uuid();

  @Column({ nullable: false })
  token: string = uuid();

  @Column({ length: 36 })
  userId: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}

export default UserToken;
