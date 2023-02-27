import { User } from './user';

describe('User Integration Tests', () => {
  describe('create method', () => {
    it('should a invalid user using name property', () => {
      expect(() => new User({ name: null })).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => new User({ name: '' })).containsErrorMessages({
        name: ['name should not be empty'],
      });

      expect(() => new User({ name: 5 as any })).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => new User({ name: 't'.repeat(256) })).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters'],
      });
    });

    it('should a invalid user using email property', () => {
      expect(() => new User({ email: 5 } as any)).containsErrorMessages({
        email: ['email must be an email'],
      });

      expect(
        () => new User({ email: 'some text' } as any),
      ).containsErrorMessages({
        email: ['email must be an email'],
      });
    });

    it('should a invalid user using is_active property', () => {
      expect(() => new User({ is_active: 5 } as any)).containsErrorMessages({
        is_active: ['is_active must be a boolean value'],
      });
    });

    it('should a valid user', () => {
      expect.assertions(0);

      new User({ name: 'new user' }); // NOSONAR
      new User({ name: 'new user', email: 'some@email.com' }); // NOSONAR
      new User({ name: 'new user', email: null }); // NOSONAR

      /* NOSONAR*/ new User({
        name: 'new user',
        email: 'some@email.com',
        is_active: false,
      });
      /* NOSONAR */ new User({
        name: 'new user',
        email: 'some@email.com',
        is_active: true,
      });
    });
  });

  describe('update method', () => {
    it('should a invalid User using name property', () => {
      const user = new User({ name: 'new user' });
      expect(() => user.update(null, null)).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => user.update('', null)).containsErrorMessages({
        name: ['name should not be empty'],
      });

      expect(() => user.update(5 as any, null)).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters',
        ],
      });

      expect(() => user.update('t'.repeat(256), null)).containsErrorMessages({
        name: ['name must be shorter than or equal to 255 characters'],
      });
    });

    it('should a invalid user using email property', () => {
      const user = new User({ name: 'new user' });
      expect(() => user.update(null, 5 as any)).containsErrorMessages({
        email: ['email must be an email'],
      });

      expect(() => user.update(null, 'some text' as any)).containsErrorMessages(
        {
          email: ['email must be an email'],
        },
      );
    });

    it('should a valid user', () => {
      expect.assertions(0);
      const user = new User({ name: 'new user' });
      user.update('name changed', null);
      user.update('name changed', 'some@email.com');
    });
  });
});
