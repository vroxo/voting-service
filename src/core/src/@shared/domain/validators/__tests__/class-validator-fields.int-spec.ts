import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import ClassValidatorFields from '../class-validator-fields';

class StubRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
  validate(data: any) {
    return super.validate(new StubRules(data));
  }
}
describe('ClassValidatorFields Integration tests', () => {
  const validator = new StubClassValidatorFields();
  it('should validate with errors', () => {
    expect(validator.validate(null)).toBeFalsy();
    expect(validator.errors).toStrictEqual({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ],
      price: [
        'price should not be empty',
        'price must be a number conforming to the specified constraints',
      ],
    });
  });

  it('should be valid', () => {
    const data = { name: 'some value', price: 5 };
    expect(validator.validate(data)).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(new StubRules(data));
  });
});
