import { Router } from 'express';
import userRouter from './userRouter';
import appointmentRouter from './appointmentsRouter';

const router: Router = Router();

router.use('/users', userRouter);
router.use('/appointments', appointmentRouter);

export default router;
