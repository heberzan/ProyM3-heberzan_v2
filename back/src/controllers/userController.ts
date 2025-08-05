import { Request, Response } from 'express';
import { UserLoginDTO, UserRegisterDTO } from '../dtos/UserDTO';
import {
  getUserService,
  getUserByIdService,
  registerUserService,
} from '../services/userService';

// Controlador para obtener todos los usuarios
export const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  // El tipado void es de tipo vacío, indicando que no se espera un retorno.
  try {
    const users = await getUserService(); // Llama al servicio para obtener la lista de usuarios
    res.status(200).json({ message: 'Getting all users...', data: users });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'Error getting users, unknown error',
      data: {},
    });
  }
};

// Controlador para obtener un usuario por ID
export const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const userFound = await getUserByIdService(parseInt(req.params.id, 10)); // Llama al servicio para obtener el usuario por ID { id } = req.params;
    res.status(200).json({
      message: `Getting user with ID: ${req.params.id}`,
      data: userFound,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'User not found, unknown error',
      data: {},
    });
  }
};

// Controlador para registrar un nuevo usuario
export const registerUserController = async (
  req: Request<unknown, unknown, UserRegisterDTO>,
  res: Response
): Promise<void> => {
  try {
    const userRegisterResponse = await registerUserService(req.body); // Llama al servicio para registrar un nuevo usuario
    res.status(201).json({
      message: 'User registered successfully',
      data: userRegisterResponse,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : 'Error registering user, unknown error',
      data: {},
    });
  }
};

export const loginUserController = (
  req: Request<unknown, unknown, UserLoginDTO>,
  res: Response
): void => {
  res.status(201).json({
    message: 'User logged in successfully',
    data: {},
  });
};
