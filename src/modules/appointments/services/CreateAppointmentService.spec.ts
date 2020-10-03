import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('Create Appointment', () => {
  it('should create a appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: '333',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const date = new Date();
    await createAppointment.execute({
      date,
      providerId: '333',
    });

    await expect(
      createAppointment.execute({
        date,
        providerId: '333',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
