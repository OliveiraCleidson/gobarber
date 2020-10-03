import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: IUsersRepository;
let fakeHashProvider: IHashProvider;
let fakeUserTokensRepository: IUserTokensRepository;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
  });

  it('should be able to reset password', async () => {
    const resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      email: 'email@email.com',
      name: 'John',
      password: '3444',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const newPassword = '4877';
    await resetPassword.execute({
      password: newPassword,
      token,
    });

    const updateUser = await fakeUsersRepository.findById(user.id);

    expect(updateUser?.password).toBe(newPassword);
  });

  it('should not be able to reset the password with non-existing token', async () => {
    const resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );

    await expect(
      resetPassword.execute({
        password: 'asd',
        token: 'sainexs',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );

    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({
        password: 'asd',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      email: 'email@email.com',
      name: 'John',
      password: '3444',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await expect(
      resetPassword.execute({
        password: 'asd',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
