import { validateSync } from 'class-validator';
import ValidatorFieldInterface, {
  FieldErrors,
} from './validator-fields-interface';

export class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldInterface<PropsValidated>
{
  errors: FieldErrors = null;
  validatedData: PropsValidated = null;
  validate(data: any): boolean {
    const errors = validateSync(data);
    if (errors.length) {
      this.errors = {};
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }
    } else {
      this.validatedData = data;
    }

    return !errors.length;
  }
}

export default ClassValidatorFields;
