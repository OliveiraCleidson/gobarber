import ICreateAppointmentdTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { isEqual } from 'date-fns';
import Appointment from '../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(
      appointment => appointment.id === id,
    );
    return appointment;
  }

  public async create(data: ICreateAppointmentdTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, data);
    this.appointments.push(appointment);
    return appointment;
  }

  public async save(appointment: Appointment): Promise<Appointment> {
    const appointmentIndex = this.appointments.findIndex(
      appointmentSearch => appointmentSearch.id === appointment.id,
    );
    if (!appointmentIndex) {
      this.appointments.push(appointment);
      return appointment;
    }

    this.appointments[appointmentIndex] = appointment;
    return appointment;
  }
}

export default FakeAppointmentsRepository;
