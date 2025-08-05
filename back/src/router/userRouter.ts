import { Router, Request, Response } from 'express';
import {
  getUserByIdController,
  getUsersController,
  loginUserController,
  registerUserController,
} from '../controllers/userController';
import { UserLoginDTO, UserRegisterDTO } from '../dtos/UserDTO';

const userRouter: Router = Router();

userRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  await getUsersController(req, res);
});
userRouter.get(
  '/:id',
  async (req: Request<{ id: string }>, res: Response): Promise<void> =>
    await getUserByIdController(req, res)
);
userRouter.post(
  '/register',
  async (
    req: Request<unknown, unknown, UserRegisterDTO>,
    res: Response
  ): Promise<void> => await registerUserController(req, res) // Usar el DTO <UserRegisterDTO> para tipar el cuerpo de la solicitud, la firma del DTO
);
userRouter.post(
  '/login',
  (req: Request<unknown, unknown, UserLoginDTO>, res: Response): void =>
    loginUserController(req, res)
);

export default userRouter;

///////////////////////////////////////////

//// - ZONA DE PRUEBAS - ////
// userRouter.get('/', (req, res) => {
//   res.send('Get all users');
// });

//////////////////////////////////////////
