import ICreateAppointmentdTO from '../dtos/ICreateAppointmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  findById(id: string): Promise<Appointment | undefined>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  create(data: ICreateAppointmentdTO): Promise<Appointment>;
  save(appointment: Appointment): Promise<Appointment>;
}
