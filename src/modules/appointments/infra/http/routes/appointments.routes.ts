import { Router, Request, Response } from 'express';
import { parseISO } from 'date-fns';

import { getRepository } from 'typeorm';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { container } from 'tsyringe';
import Appointment from '../../typeorm/entities/Appointment';
import AppointmentsController from '../controllers/AppointmentsController';

const routes = Router();
const appointmentsControllers = new AppointmentsController();

routes.use(ensureAuthenticated);

routes.get('/', async (req, res) => {
  const appointmentsRepository = getRepository(Appointment);
  const appointments = await appointmentsRepository.find();

  return res.status(200).json(appointments);
});

routes.post('/', appointmentsControllers.create);

export default routes;
