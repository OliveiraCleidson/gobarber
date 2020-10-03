export default interface IMailProvider {
  sendMail(data: { to: string; body: string }): Promise<void>;
}
