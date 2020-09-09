import {Router, Request, Response, response} from 'express'
import { startOfHour, parseISO} from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import { getCustomRepository } from 'typeorm'

const routes = Router()

routes.use(ensureAuthenticated)

routes.get("/", async (req,res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()

  return res.status(200).json(appointments)
})

routes.post("/", async (req : Request, res : Response) => {
  try{
    const {provider, date} = req.body
    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()
    const appointment = await createAppointment.execute({provider, date: parsedDate})


    return res.status(200).json(appointment)
  } catch(err){
    return res.status(400).json({error: err.message})
  }
})

export default routes
