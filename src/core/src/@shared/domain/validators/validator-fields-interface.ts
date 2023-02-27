export type FieldErrors = {
  [field: string]: string[];
};

export interface ValidatorFieldInterface<PropsValidated> {
  errors: FieldErrors;
  validatedData: PropsValidated;
  validate(data: any): void;
}

export default ValidatorFieldInterface;
