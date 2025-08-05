// Los DTO son objetos que definen la estructura de los datos que se envían y reciben en las solicitudes HTTP.
export interface UserRegisterDTO {
  // Lo que quiero recibir cuando un usuario se registre.
  name: string;
  email: string;
  birthday: Date;
  dni: number;
  username: string;
  password: string;
}

export interface UserLoginDTO {
  // Lo que quiero recibir cuando un usuario se loguee. Lo que me va allegar por body.
  username: string;
  password: string;
}

export interface UserResponseDTO {
  // Lo que quiero devolver cuando un usuario se registre.

  name: string;
  email: string;
}
