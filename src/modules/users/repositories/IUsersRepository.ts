import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User | undefined>;
  create(payload: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
}
