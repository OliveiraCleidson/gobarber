import {Router} from 'express'
import { startOfHour, parseISO} from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentRepository'

const routes = Router()
const appointmentsRepository = new AppointmentsRepository()


routes.post("/", (req, res) => {
  const {provider, date} = req.body

  const parsedDate = startOfHour(parseISO(date))
  const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate)

  if(findAppointmentInSameDate){
    return res.status(400).json({message: "This appointment is already booked"})
  }

  const appointment = appointmentsRepository.create(provider, parsedDate)

  return res.status(200).json(appointment)
})

export default routes