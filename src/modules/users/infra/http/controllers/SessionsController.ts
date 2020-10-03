import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const autheticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await autheticateUser.execute({ email, password });

    return response.status(200).json({ user, token });
  }
}
