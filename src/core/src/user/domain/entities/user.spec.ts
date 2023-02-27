import { UniqueEntityId } from '@shared/domain';
import { User, UserProperties } from './user';

describe('User Unit Tests', () => {
  beforeEach(() => {
    User.validate = jest.fn();
  });
  test('constructor of user', () => {
    const created_at = new Date();

    type Arrange = {
      props: UserProperties;
      expected: UserProperties;
    };
    const arrange: Arrange[] = [
      {
        props: { name: 'new user' },
        expected: { name: 'new user', email: null, is_active: true },
      },
      {
        props: { name: 'new user', email: 'email@test.com' },
        expected: {
          name: 'new user',
          email: 'email@test.com',
          is_active: true,
        },
      },
      {
        props: { name: 'new user', email: 'email@test.com', is_active: false },
        expected: {
          name: 'new user',
          email: 'email@test.com',
          is_active: false,
        },
      },
      {
        props: {
          name: 'new user',
          email: 'email@test.com',
          is_active: false,
          created_at,
        },
        expected: {
          name: 'new user',
          email: 'email@test.com',
          is_active: false,
          created_at,
        },
      },
    ];

    arrange.forEach((i) => {
      const user = new User({ ...i.props });
      expect(user.props).toMatchObject(i.expected);
      expect(user.created_at).toBeInstanceOf(Date);
    });

    expect(User.validate).toHaveBeenCalledTimes(4);
  });

  test('getter of name field', () => {
    const user = new User({ name: 'new user' });
    expect(User.validate).toHaveBeenCalled();
    expect(user.name).toBe('new user');
  });

  test('getter and setter of email field', () => {
    let user = new User({ name: 'new user' });
    expect(user.email).toBeNull();

    user = new User({ name: 'new user', email: 'email@test.com' });
    expect(user.email).toBe('email@test.com');

    user['email'] = 'another.email@test.com';
    expect(user.email).toBe('another.email@test.com');

    user['email'] = undefined;
    expect(user.email).toBeNull();
    expect(User.validate).toHaveBeenCalledTimes(2);
  });

  test('getter and setter of is_active field', () => {
    let user = new User({ name: 'new user' });
    expect(user.is_active).toBeTruthy();

    user = new User({ name: 'new user', is_active: false });
    expect(user.is_active).toBeFalsy();

    user['is_active'] = undefined;
    expect(user.is_active).toBeTruthy();

    user['is_active'] = null;
    expect(user.is_active).toBeTruthy();
    expect(User.validate).toHaveBeenCalledTimes(2);
  });

  test('getter and setter of created_at field', () => {
    let user = new User({ name: 'new user' });
    expect(user.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    user = new User({ name: 'new user', created_at });
    expect(user.created_at).toBe(created_at);

    user['created_at'] = undefined;
    expect(user.created_at).toBeInstanceOf(Date);

    user['created_at'] = null;
    expect(user.created_at).toBeInstanceOf(Date);
    expect(User.validate).toHaveBeenCalledTimes(2);
  });

  test('ID field', () => {
    type Arrange = {
      props: UserProperties;
      id?: UniqueEntityId;
    };

    const data: Arrange[] = [
      { props: { name: 'new user' } },
      { props: { name: 'new user' }, id: null },
      { props: { name: 'new user' }, id: undefined },
      { props: { name: 'new user' }, id: new UniqueEntityId() },
    ];

    data.forEach((i) => {
      const user = new User({ ...i.props }, i.id);
      expect(user.id).not.toBeNull();
      expect(user.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });

    expect(User.validate).toHaveBeenCalledTimes(4);
  });

  test('update user', () => {
    const arrange = { name: 'User', email: 'user@email.com' };

    const user = new User(arrange);
    user.update('User Updated', 'user2@email.com');

    expect(User.validate).toHaveBeenCalledTimes(2);
    expect(user.name).toBe('User Updated');
    expect(user.email).toBe('user2@email.com');
  });

  test('activate user', () => {
    const arrange = { name: 'User', email: 'user@email.com', is_active: false };

    const user = new User(arrange);
    user.activate();

    expect(user.is_active).toBeTruthy();
  });

  test('deactivate user', () => {
    const arrange = { name: 'User', email: 'user@email.com' };

    const user = new User(arrange);
    user.deactivate();

    expect(user.is_active).toBeFalsy();
  });
});
