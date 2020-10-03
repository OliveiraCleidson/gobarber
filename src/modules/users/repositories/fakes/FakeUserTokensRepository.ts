import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '../IUserTokensRepository';

export default class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(userId: string): Promise<UserToken> {
    const user = new UserToken();

    Object.assign(user, { userId, createAt: new Date(), updateAt: new Date() });
    this.userTokens.push(user);

    return user;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const user = this.userTokens.find(find => find.token === token);
    return user;
  }
}
