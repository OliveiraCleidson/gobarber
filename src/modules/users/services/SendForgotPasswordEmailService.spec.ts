import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: IUsersRepository;
let fakeMailProvider: IMailProvider;
let fakeUserTokensRepository: IUserTokensRepository;

describe('Send Forgot Email', () => {
  beforeEach(() => {
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersRepository = new FakeUsersRepository();
  });

  it('should be able to recover the password using the email', async () => {
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      email: 'email@email.com',
      name: 'John',
      password: '3444',
    });

    await sendForgotPasswordEmail.execute({
      email: 'email@email.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'nonexisting@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able a forgot password token', async () => {
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    await fakeUsersRepository.create({
      email: 'email@email.com',
      name: 'John',
      password: '3444',
    });

    await sendForgotPasswordEmail.execute({
      email: 'email@email.com',
    });

    expect(generateToken).toHaveBeenCalled();
  });

  // it('should be able to recover the password using the email', async () => {
  //   const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
  //     fakeUsersRepository,
  //     fakeMailProvider,
  //     fakeUserTokensRepository,
  //   );

  //   await fakeUsersRepository.create({
  //     email: 'email@email.com',
  //     name: 'John',
  //     password: '3444',
  //   });

  //   await sendForgotPasswordEmail.execute({
  //     email: 'email@email.com',
  //   });

  //   expect(sendMail).toHaveBeenCalled();
  // });
});
