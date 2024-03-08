export class VoteAlreadyExistsError extends Error {
  constructor() {
    super('User already voted in this session.');
  }
}
