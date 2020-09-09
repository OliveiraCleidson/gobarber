import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const autheticateUser = new AuthenticateUserService()

    const {user, token} = await autheticateUser.execute({ email, password });

    delete user.password, delete user.updateAt, delete user.createAt;
    return res.status(200).json({user, token});
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

export default sessionsRouter;
