import { ScheduleAppDTO } from '../dtos/AppointmentDTO';
import { IAppointment, Status } from '../interfaces/AppointmentInterface';
import { getUserByIdService } from './userService';

const appointmentList: IAppointment[] = [];

let id: number = 1;

// Función para registrar una nueva cita
export const registerAppService = async (
  appointment: ScheduleAppDTO
): Promise<ScheduleAppDTO> => {
  // Verificar si el usuario existe antes de registrar la cita
  await getUserByIdService(appointment.userId);
  // Si la verificación pasa, se procede a verificar si ya existe la cita
  const appFound = appointmentList.find(
    (app) =>
      new Date(app.date).getTime() === new Date(appointment.date).getTime() &&
      app.time === appointment.time &&
      app.userId === appointment.userId
  );
  if (appFound) {
    throw new Error(
      `Ya existe una cita programada para el usuario con ID ${appointment.userId} en la fecha ${appointment.date} a las ${appointment.time}`
    );
  }
  // Si no existe, se crea la cita
  const newAppointment: IAppointment = {
    id: id++,
    date: new Date(appointment.date),
    time: appointment.time,
    userId: appointment.userId,
    status: Status.active,
  };
  // Agregar la nueva cita a la lista de citas
  // y retornar el objeto creado
  appointmentList.push(newAppointment);
  return newAppointment;
};

// Función para obtener todas las citas
export const getAppService = async (): Promise<IAppointment[]> => {
  return appointmentList;
};

// Función para obtener citas por ID de usuario
export const getAppByIdService = async (id: number): Promise<IAppointment> => {
  // Filtrar las citas por ID de usuario
  const appFound = appointmentList.find((app) => app.id === id);
  if (!appFound) {
    throw new Error(`No se encontró una cita con el ID ${id}`);
  } else return appFound;
};

// Función para cancelar una cita
export const cancelAppService = async (id: number): Promise<IAppointment> => {
  // Buscar la cita por ID
  const appFound = appointmentList.find((app) => app.id === id);
  if (!appFound) {
    throw new Error(`No se encontró una cita con el ID ${id}`);
  }
  // Cambiar el estado de la cita a cancelada
  appFound.status = Status.cancelled;
  return appFound;
};
