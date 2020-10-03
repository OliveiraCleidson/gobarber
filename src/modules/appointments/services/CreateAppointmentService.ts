import AppError from '@shared/errors/AppError';
import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import ICreateAppointmentdTO from '../dtos/ICreateAppointmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    providerId,
    date,
  }: ICreateAppointmentdTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 400);
    }

    const appointment = await this.appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
