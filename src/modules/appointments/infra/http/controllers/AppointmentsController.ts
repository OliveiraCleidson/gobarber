import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);
    const appointment = await createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return response.status(200).json(appointment);
  }
}
