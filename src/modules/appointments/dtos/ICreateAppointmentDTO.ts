import User from '@modules/users/infra/typeorm/entities/User';

export default interface ICreateAppointmentdTO {
  providerId: string;
  date: Date;
}
