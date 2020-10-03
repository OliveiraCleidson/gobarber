import ICreateAppointmentdTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne(id);
    return appointment;
  }

  public async create({
    date,
    providerId,
  }: ICreateAppointmentdTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      date,
      provider: { id: providerId },
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async save(appointmentToSave: Appointment): Promise<Appointment> {
    const appointment = await this.ormRepository.save(appointmentToSave);
    return appointment;
  }
}

export default AppointmentsRepository;
