export class SessionClosedError extends Error {
  constructor() {
    super('Session closed');
  }
}
