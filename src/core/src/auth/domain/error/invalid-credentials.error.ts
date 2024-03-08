export class InvalidCredentialsError extends Error {
  constructor(msg: string) {
    super(`Invalid credentials: ${msg}`);
  }
}
