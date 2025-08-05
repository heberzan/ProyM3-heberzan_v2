import 'dotenv/config';

export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 3001; // Puerto por defecto 3001, si no se especifica en el .env
