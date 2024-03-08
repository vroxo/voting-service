export class NonPositiveVoteError extends Error {
  constructor() {
    super('At least one vote must be positive.');
  }
}
