import IMessage from '../dtos/IMessage';
import IMailProvider from '../models/IMailProvider';

export default class FakeMailProvider implements IMailProvider {
  private messages: IMessage[] = [];

  public async sendMail({ to, body }: IMessage): Promise<void> {
    this.messages.push({ to, body });
  }
}
