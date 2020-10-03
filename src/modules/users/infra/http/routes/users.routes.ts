import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UploadUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvataController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
