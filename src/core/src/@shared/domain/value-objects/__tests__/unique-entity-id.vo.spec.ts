import InvalidUuidError from '../../errors/invalid-uuid.error';
import UniqueEntityId from '../../value-objects/unique-entity-id.vo';
import { validate as uuidValidate } from 'uuid';

describe('UniqueEntityId Unit Tests.', () => {
  it('should throw new error when uuid is invalid', () => {
    const spyValidate = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    expect(() => new UniqueEntityId('Fake id!')).toThrow(
      new InvalidUuidError(),
    );
    expect(spyValidate).toHaveBeenCalled();
  });

  it('should accept a uuid passed in constructor', () => {
    const spyValidate = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    const uuid = '34acbab6-8176-4aef-afa4-907c1a3ea037';
    const vo: UniqueEntityId = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
    expect(spyValidate).toHaveBeenCalled();
  });

  it('should accept not passed in constructor', () => {
    const spyValidate = jest.spyOn(UniqueEntityId.prototype as any, 'validate');
    const vo: UniqueEntityId = new UniqueEntityId();
    expect(spyValidate).toHaveBeenCalled();
    expect(uuidValidate(vo.value)).toBeTruthy();
  });
});
