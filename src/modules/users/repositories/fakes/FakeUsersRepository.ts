import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../../infra/typeorm/entities/User';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, data);
    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(find => find.email === email);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(find => find.id === id);
    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(find => find.id === user.id);
    if (!userIndex) {
      this.users.push(user);
      return user;
    }

    this.users[userIndex] = user;
    return user;
  }
}
