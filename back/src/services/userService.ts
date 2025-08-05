import { UserRegisterDTO, UserResponseDTO } from '../dtos/UserDTO';
import { getCredentialService } from './credentialService';
import { IUser } from '../interfaces/UserInterface';

// Servicio para registrar un nuevo usuario

const userList: IUser[] = []; // Lista para almacenar los usuarios registrados
let id: number = 1;

// Función para obtener la lista de usuarios
export const getUserService = async (): Promise<UserResponseDTO[]> => {
  return userList.map((user) => {
    return {
      name: user.name,
      email: user.email,
    };
  });
};

// Función para obtener un usuario por ID
export const getUserByIdService = async (id: number): Promise<IUser> => {
  const userFound = userList.find((user) => user.id === id);
  if (!userFound) {
    throw new Error(`Usuario con ID ${id} no encontrado`);
  }
  return userFound;
};

// Función para registrar un nuevo usuario
export const registerUserService = async (
  user: UserRegisterDTO
): Promise<UserResponseDTO> => {
  const idUserCredentials = await getCredentialService(
    user.username,
    user.password
  );
  const newUser: IUser = {
    id: id++,
    name: user.name,
    email: user.email,
    birthdate: user.birthday,
    nDni: user.dni,
    credentialsId: idUserCredentials,
  };
  userList.push(newUser); // Agrega el nuevo usuario a la lista de usuarios
  return {
    name: newUser.name,
    email: newUser.email,
  };
};
