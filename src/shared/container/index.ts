import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';

import '@modules/users/providers/';
import './providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
