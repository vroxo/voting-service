export class SessionOpenNotFoundError extends Error {
  constructor() {
    super('Session open not found');
  }
}
