import ClassValidatorFields from '../validators/class-validator-fields';
import { FieldErrors } from '../validators/validator-fields-interface';
import { EntityValidationError } from '../errors/validation.error';
import { objectContaining } from 'expect';

type Expected =
  | {
      validator: ClassValidatorFields<any>;
      data: any;
    }
  | (() => any);

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldErrors) {
    if (typeof expected === 'function') {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrorsMessages(error.error, received);
      }
    } else {
      const { validator, data } = expected;
      const validated = expected.validator.validate(data);

      if (validated) {
        isValid();
      }
      return assertContainsErrorsMessages(validator.errors, received);
    }
  },
});

function isValid() {
  return { pass: true, message: () => '' };
}

function assertContainsErrorsMessages(
  expected: FieldErrors,
  received: FieldErrors,
) {
  const isMatch = objectContaining(received).asymmetricMatch(expected);
  return isMatch
    ? isValid()
    : {
        pass: false,
        message: () =>
          `The validation  errors not contains ${JSON.stringify(
            received,
          )}. Current: ${JSON.stringify(expected)}`,
      };
}
