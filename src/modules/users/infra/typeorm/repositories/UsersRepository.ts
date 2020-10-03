import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      email,
      name,
      password,
    });
    await this.ormRepository.save(user);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async save(userToSave: User): Promise<User> {
    const user = await this.ormRepository.save(userToSave);
    return user;
  }
}
