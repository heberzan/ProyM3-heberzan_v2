export interface IAppointment {
  id: number;
  date: Date; // Para validar los dias
  time: string;
  userId: number;
  status: Status; // active | cancelled // Por defecto generamos el Status en ACTIVE
}
export enum Status {
  active = 'active',
  cancelled = 'cancelled',
}
