import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
export default class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(userId: string): Promise<UserToken> {
    const user = this.ormRepository.create({ userId });
    await this.ormRepository.save(user);

    return user;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const user = this.ormRepository.findOne({ where: { token } });
    return user;
  }
}
