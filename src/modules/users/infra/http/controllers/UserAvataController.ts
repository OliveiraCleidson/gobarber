import UpdateUserAvatarService from '@modules/users/services/UploadUserAvatarService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.status(200).json(user);
  }
}
