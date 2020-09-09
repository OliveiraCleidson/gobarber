import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });

    delete user.password, delete user.updateAt;
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

usersRouter.patch('/', ensureAuthenticated,async (req, res) => {
  return res.status(200).json({message: "Ok"})
})

export default usersRouter;
