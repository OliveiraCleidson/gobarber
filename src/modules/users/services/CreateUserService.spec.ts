import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('Create User', () => {
  it('should create a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      email: 'email@email.com',
      name: 'Joe',
      password: '333',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be not able to create a user with same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      email: 'email@email.com',
      name: 'Joe',
      password: '333',
    });

    await expect(
      createUser.execute({
        email: 'email@email.com',
        name: 'Joe',
        password: '333',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
