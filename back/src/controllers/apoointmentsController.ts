import { Request, Response } from 'express';
import { ScheduleAppDTO } from '../dtos/AppointmentDTO';
import {
  cancelAppService,
  getAppByIdService,
  getAppService,
  registerAppService,
} from '../services/appointmentService';

// Controllers for appointment management
export const getAppointmentsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({
      message: 'Appointments retrieved successfully',
      data: await getAppService(),
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'Error getting appointments, unknown error',
    });
  }
};
export const getAppointmentByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    res.status(200).json({
      message: `Appointment ${id} retrieved successfully`,
      data: await getAppByIdService(parseInt(req.params.id, 10)),
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : `Error getting appointment by ${id}, unknown error`,
    });
  }
};
export const scheduleAppointmentController = async (
  req: Request<unknown, unknown, ScheduleAppDTO>,
  res: Response
): Promise<void> => {
  // Logic to schedule an appointment
  try {
    res.status(200).json({
      message: 'Appointment scheduled successfully',
      data: await registerAppService(req.body),
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'Error scheduling appointment, unknown error',
    });
  }
};
export const cancelAppointmentController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  // Logic to cancel an appointment
  try {
    res.status(200).json({
      message: `Appointment ${req.params.id} cancelled successfully`,
      data: await cancelAppService(parseInt(req.params.id, 10)), // await cancelAppService(parseInt(req.params.id, 10)),
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : `Error cancelling appointment by ${req.params.id}, unknown error`,
    });
  }
};
