import { ICredential } from '../interfaces/CredentialsInterface';
import bcrypt from 'bcrypt';

const credentialslist: ICredential[] = [];

let id: number = 1;

/////////////////// ENCRIPTAR LA CONTRASEÑA USANDO BCRYPT /////////////////////////
// Número de rondas para el hashing (10-12 es recomendado)
const SALT_ROUNDS = 10;

// Función para encriptar la contraseña usando bcrypt
const crypPass = async (text: string): Promise<string> => {
  try {
    //   Genera el hash de la contraseña con bcrypt
    const hashedPassword = await bcrypt.hash(text, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error);
    throw new Error('Error al encriptar la contraseña');
  }
};

// Función para verificar una contraseña contra su hash
export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Error al verificar la contraseña:', error);
    throw new Error('Error al verificar la contraseña');
  }
};

//////////////////////////////////////////////////////////////////////////////////////

const checkUserExist = (username: string): void => {
  console.log('checkUserExist:', username);
  console.log('credentialslist:', credentialslist);
  // Verifica si el usuario ya existe en la lista de credenciales
  const credentialFound = credentialslist.find(
    (cred) => cred.username === username
  );
  if (credentialFound) throw new Error(`El usuario: ${username} ya existe`); // con throw se lanza una excepción y se detiene la ejecución y se lanza un error
};

export const getCredentialService = async (
  username: string,
  password: string
): Promise<number> => {
  console.log('getCredentialService:', username, password);
  checkUserExist(username); // Verifica si el usuario ya existe

  const credentials: ICredential = {
    id: id++,
    username: username,
    password: await crypPass(password),
  };
  // Agregar las credenciales a la lista
  credentialslist.push(credentials);
  console.log(credentials);
  return credentials.id;
};

// Ejemplo de verificación de contraseña
export const checkUserCredentialService = async (
  username: string,
  password: string
): Promise<number> => {
  console.log('checkUserCredentialService:', username, password);
  console.log('credentialslist:', credentialslist);
  // Verifica si el usuario existe en la lista de credenciales
  const credentialFound = credentialslist.find(
    (cred) => cred.username === username
  );
  if (!credentialFound)
    throw new Error(
      `No se encontraron credenciales para el usuario: ${username}`
    );
  console.log('credentialFound:', credentialFound);

  // Verifica si la contraseña es correcta
  const hashedPassword = credentialFound.password; // Aquí se obtiene el hash de la contraseña almacenada
  // Verifica la contraseña ingresada con el hash almacenado
  const isValid = await verifyPassword(password, hashedPassword);
  if (isValid) return credentialFound.id;
  else throw new Error(`Credenciales incorrectas para el usuario: ${username}`);
};

//////////////////////////////////////////////////////////////////////////////////////
// Para probar el servicio de credenciales, puedes usar un script de prueba o ejecutarlo directamente

// Ejemplo de uso con ts-node, se monta un "scripts" en el package.json que llame o ejecute el archivo .ts (credentialService.ts), ejemplo: En el package.json: "dev:test": "ts-node src/services/credentialService.ts", y en la terminal se ejecuta: npm run dev:test

// Si quieres probar el servicio de credenciales, puedes descomentar el siguiente bloque de código y ejecutarlo directamente:

// const testUsername = async () => {
//   await getCredentialService('user1', 'pass123');
//   await getCredentialService('user2', 'pass123');
//   await getCredentialService('user3', 'pass123');

//   console.log(await checkUserCredentialService('use2', 'pass123'));
// };
// testUsername();

////////////////////////////////////////////////////////////////////////////////////////////////

// import { ICredential } from '../interfaces/CredentialsInterface';

// let id: number = 1;

// // Función BASICA para encriptar la contraseña - HECHA POR EL PROFESOR
// // No se recomienda para producción, pero es útil para entender el concepto
// // de encriptación de contraseñas
// // Esta función utiliza el algoritmo SHA-256 para encriptar la contrasena
// // y devuelve un hash hexadecimal de la contrasena encriptada

// const crypPass = async (text: string): Promise<string> => {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(text);
//   const hash = await crypto.subtle.digest('SHA-256', data);
//   const hashArray = Array.from(new Uint8Array(hash));
//   const hashHex = hashArray
//     .map((b) => b.toString(16).padStart(2, '0'))
//     .join('');

//   return hashHex;
// };

// export const getCredentialService = async (
//   username: string,
//   password: string
// ): Promise<number> => {
//   const credentials: ICredential = {
//     id: id++,
//     username: username,
//     password: await crypPass(password),
//   };
//   console.log(credentials);
//   return credentials.id;
// };
