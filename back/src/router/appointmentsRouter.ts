import { Request, Response, Router } from 'express';
import {
  cancelAppointmentController,
  getAppointmentByIdController,
  getAppointmentsController,
  scheduleAppointmentController,
} from '../controllers/apoointmentsController';
import { ScheduleAppDTO } from '../dtos/AppointmentDTO';

const appointmentRouter: Router = Router();

appointmentRouter.get(
  '/',
  (req: Request, res: Response): Promise<void> =>
    getAppointmentsController(req, res)
);
appointmentRouter.get(
  '/:id',
  (req: Request<{ id: string }>, res: Response): Promise<void> =>
    getAppointmentByIdController(req, res)
);
appointmentRouter.post(
  '/schedule',
  (
    req: Request<unknown, unknown, ScheduleAppDTO>,
    res: Response
  ): Promise<void> => scheduleAppointmentController(req, res)
);
appointmentRouter.put(
  '/cancel/:id',
  (req: Request<{ id: string }>, res: Response): Promise<void> =>
    cancelAppointmentController(req, res)
);

export default appointmentRouter;
